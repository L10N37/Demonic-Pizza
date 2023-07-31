import React, { useContext, useState } from 'react';
import { CartContext } from '../contexts/CartContext';

const Cart = () => {
  const { cart } = useContext(CartContext);
  const [delivery, setDelivery] = useState(false);
  const deliveryFee = 12.99;

  const totalCartPrice = cart.reduce((total, cartItem) => total + cartItem.totalPrice, 0) + (delivery ? deliveryFee : 0);

  const handleCheckout = () => {
    console.log('Proceeding to checkout');
  };

  const handleDeliveryChange = () => {
    setDelivery(!delivery);
  };

  const handleLogin = () => {
    // Actual login handling will go here.
    console.log('Login clicked');
  };

  return (
    <div>
      {cart.length === 0 ? (
        <p id="cartEmptyText">Your cart is empty.</p>
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
          <div className="checkout-btn-container">
            <input type="checkbox" id="delivery" name="delivery" checked={delivery} onChange={handleDeliveryChange} />
            <label htmlFor="delivery">Add Delivery ($12.99)</label>
          <br />
          <br />
            <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
          </div>
          <br />
          <br />
          <div className="login-btn-container">
            <button className="login-btn" onClick={handleLogin}>Login</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
