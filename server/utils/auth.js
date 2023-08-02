const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const { User } = require('../models');

// Function to create a token
exports.signToken = function(user) {
  return jwt.sign(
    { 
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName 
    }, 
    secret,
    {
      expiresIn: '1d' // token will expire in 1 day
    }
  );
};


const authMiddleware = async ({ req }) => {
  const token = req.headers.authorization || '';
  if (token) {
    try {
      const { _id } = jwt.verify(token, secret);
      const user = await User.findById(_id);
      return { user };
    } catch (e) {
      console.error(e);
    }
  }
  return {};
};
