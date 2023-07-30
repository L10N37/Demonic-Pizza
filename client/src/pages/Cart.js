// pages/Cart.js

import React, { useContext } from 'react';
import { CartContext } from '../components/CartContext';

const Cart = () => {
  const { cart } = useContext(CartContext);

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              <h3>Pizza: {item.pizza.name}</h3>
              {item.crust && <p>Crust: {item.crust.name} - ${item.crust.price.toFixed(2)}</p>}
              {item.extras.length > 0 && <p>Extras:</p>}
              {item.extras.map(extra => <p key={extra._id}>- {extra.name} - ${extra.price.toFixed(2)}</p>)}
              <p>Total: ${item.totalPrice.toFixed(2)}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
