import React, { useContext } from 'react';
import { CartContext } from './CartContext';

const Cart = () => {
  const { cart } = useContext(CartContext);

  const calculateTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.totalPrice, 0);
  };

  return (
    <div className="cartContainer">
      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.pizza.id} className="cartItem">
              <p>{item.pizza.name}</p>
              <p>Crust: {item.crust}</p>
              <p>Extras: {item.extras.join(', ')}</p>
              <p>Price: ${item.totalPrice.toFixed(2)}</p>
            </div>
          ))}
          <hr />
          <p>Total: ${calculateTotalPrice().toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default Cart;
