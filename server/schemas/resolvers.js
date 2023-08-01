const { User, Order, Pizza, Pasta, Side, Extra, Crust } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
  Query: {
    pizzas: async () => {
      return await Pizza.find();
    },
    pizza: async (parent, { _id }) => {
      return await Pizza.findById(_id);
    },
    extras: async () => {
      return await Extra.find();
    },
    extra: async (parent, { _id }) => {
      return await Extra.findById(_id);
    },
    crusts: async () => {
      return await Crust.find();
    },
    crust: async (parent, { _id }) => {
      return await Crust.findById(_id);
    },
    pastas: async () => {
      return await Pasta.find();
    },
    pasta: async (parent, { _id }) => {
      return await Pasta.findById(_id);
    },
    sides: async () => {
      return await Side.find();
    },
    side: async (parent, { _id }) => {
      return await Side.findById(_id);
    },
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .populate('orders');
        return userData;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
  Mutation: {
    createPizza: async (parent, { name, ingredients, description, price }) => {
      return await Pizza.create({ name, ingredients, description, price });
    },
    createPasta: async (parent, { name, ingredients, description, price }) => {
      return await Pasta.create({ name, ingredients, description, price });
    },
    createSide: async (parent, { name, description, price }) => {
      return await Side.create({ name, description, price });
    },
    createExtra: async (parent, { name, description, price }) => {
      return await Extra.create({ name, description, price });
    },
    createCrust: async (parent, { name, description, price }) => {
      return await Crust.create({ name, description, price });
    },
    addUser: async (parent, { firstName, lastName, email, address, password, mobile }) => {
      const user = await User.create({ firstName, lastName, email, address, password, mobile });

      if (!user) {
        throw new Error('Something went wrong!');
      }

      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isValidPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    createOrder: async (parent, { userId }, context) => {
      if (context.user) {
        const order = await Order.create({ userId });
        return order;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addItemToOrder: async (parent, { orderId, itemId, quantity }, context) => {
      if (context.user) {
        const order = await Order.findOneAndUpdate(
          { _id: orderId },
          {
            $push: {
              items: {
                _id: itemId,
                quantity: quantity,
              },
            },
          },
          { new: true }
        );
        return order;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeItemFromOrder: async (parent, { orderId, itemId }, context) => {
      if (context.user) {
        const order = await Order.findOneAndUpdate(
          { _id: orderId },
          {
            $pull: {
              items: {
                _id: itemId,
              },
            },
          },
          { new: true }
        );
        return order;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    updateItemQuantity: async (parent, { orderId, itemId, quantity }, context) => {
      if (context.user) {
        const order = await Order.findOneAndUpdate(
          { _id: orderId, 'items._id': itemId },
          {
            $set: {
              'items.$.quantity': quantity,
            },
          },
          { new: true }
        );
        return order;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
