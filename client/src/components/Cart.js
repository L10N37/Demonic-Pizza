import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';

const Cart = () => {
  const { cart } = useContext(CartContext);

  // Calculate the total price for all items in the cart
  const totalCartPrice = cart.reduce((total, cartItem) => total + cartItem.totalPrice, 0);

  return (
    <div>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cart.map((cartItem, index) => (
              <li key={index}>
                {cartItem.pizza && (
                  <div>
                    <p>Pizza: {cartItem.pizza.name}</p>
                    <p>Crust: {cartItem.crust}</p>
                    <p>Extras: {cartItem.extras.join(', ')}</p>
                  </div>
                )}
                {cartItem.pasta && (
                  <div>
                    <p>Pasta: {cartItem.pasta.name}</p>
                  </div>
                )}
                {cartItem.side && (
                  <div>
                    <p>Side: {cartItem.side.name}</p>
                  </div>
                )}
                <p>${cartItem.totalPrice.toFixed(2)}</p>
              </li>
            ))}
          </ul>
          <p>Total Price: ${totalCartPrice.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default Cart;
