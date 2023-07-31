import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';

const Cart = () => {
  const { cart } = useContext(CartContext);

  const totalCartPrice = cart.reduce((total, cartItem) => total + cartItem.totalPrice, 0);

  return (
    <div>
      {cart.length === 0 ? (
        <p id = "cartEmptyText">Your cart is empty.</p>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Crust</th>
                <th>Extras</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((cartItem, index) => (
                <tr key={index}>
                  <td>{cartItem.pizza ? ` ${cartItem.pizza.name}` : cartItem.pasta ? `Pasta: ${cartItem.pasta.name}` : ` ${cartItem.side.name}`}</td>
                  <td>{cartItem.pizza ? cartItem.crust : ''}</td>
                  <td>{cartItem.pizza ? cartItem.extras.join(', ') : ''}</td>
                  <td>${cartItem.totalPrice.toFixed(2)}</td>
                </tr>
              ))}
              <tr>
                <td></td>
                <td></td>
                <td>Total Price:</td>
                <td>${totalCartPrice.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Cart;
