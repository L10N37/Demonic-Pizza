import React, { useState, useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import '../assets/css/SignInPage.css';
import { useMutation } from '@apollo/client';
import { SIGNUP_MUTATION, LOGIN_MUTATION } from '../utils/mutations';
//import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [signUpData, setSignUpData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: {
      street: '',
      suburb: '',
      city: '',
      state: '',
      postcode: '',
    },
    mobile: '',
    password: '',
  });

  const [signInData, setSignInData] = useState({
    email: '',
    password: '',
  });

  const [showSignUp, setShowSignUp] = useState(false);

  const [addUser, { error: signUpError }] = useMutation(SIGNUP_MUTATION);
  const [loginUser, { error: signInError }] = useMutation(LOGIN_MUTATION);

  const { cart, dispatch } = useContext(CartContext);
  
  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    if (['street', 'suburb', 'city', 'state', 'postcode'].includes(name)) {
      setSignUpData({
        ...signUpData,
        address: {
          ...signUpData.address,
          [name]: value,
        },
      });
    } else {
      setSignUpData({
        ...signUpData,
        [name]: value,
      });
    }
  };

  const handleSignInChange = (e) => {
    const { name, value } = e.target;
    setSignInData({
      ...signInData,
      [name]: value,
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const { data } = await addUser({ variables: { ...signUpData, address: { ...signUpData.address } } });
      console.log(data);
      setIsSignedIn(true);
      localStorage.setItem('isSignedIn', 'true'); // Store login status in local storage
    } catch (err) {
      console.error(err);
      // handle error
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser({ variables: { ...signInData } });
      console.log(data);
      setIsSignedIn(true);
      localStorage.setItem('isSignedIn', 'true'); // Store login status in local storage
    } catch (err) {
      console.error(err);
      // handle error
    }
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
    //dispatch({ type: 'CLEAR_CART' }); // Use dispatch to clear the cart CAUSES
    localStorage.removeItem('isSignedIn'); // Remove login status from local storage
  };

  // Check if user is signed in on initial page load
  const isSignedInLocalStorage = localStorage.getItem('isSignedIn');
  const [isSignedIn, setIsSignedIn] = useState(!!isSignedInLocalStorage);

  const totalCartPrice = cart.reduce((total, cartItem) => total + cartItem.totalPrice, 0);

  return (
    <div className="signInContainer">
      {isSignedIn && cart.length > 0 && (
        <div>
          <h2>Cart Contents</h2>
          <table>
            {/* Table for cart contents */}
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

      {cart.length === 0 && !isSignedIn && !showSignUp && (
        // Display cart empty message if cart is empty and user is not signed up
        <div>
          <p id="emptyCartText">Your cart is empty. Please sign in or sign up to view cart contents.</p>
        </div>
      )}

      {/* Sign-in form */}
      {!isSignedIn && !showSignUp && (
        <form onSubmit={handleSignIn} className="signInForm">
          <table>
            <tbody>
              <tr>
                <td><label>Email:</label></td>
                <td><input type="email" name="email" className="inputField" value={signInData.email} onChange={handleSignInChange} required /></td>
              </tr>
              <tr>
                <td><label>Password:</label></td>
                <td><input type="password" name="password" className="inputField" value={signInData.password} onChange={handleSignInChange} required /></td>
              </tr>
            </tbody>
          </table>
          <button type="submit" className="signInButton">Sign In</button>
          <button
            type="button"
            className="signUpSwitch"
            onClick={() => setShowSignUp(true)}
          >
            Switch to Sign Up
          </button>
        </form>
      )}

      {/* Sign-up form */}
      {!isSignedIn && showSignUp && (
        <form onSubmit={handleSignUp} className="signUpForm">
          <table>
            <tbody>
              <tr>
                <td><label>First Name:</label></td>
                <td><input type="text" name="firstName" className="inputField" value={signUpData.firstName} onChange={handleSignUpChange} required /></td>
              </tr>
              <tr>
                <td><label>Last Name:</label></td>
                <td><input type="text" name="lastName" className="inputField" value={signUpData.lastName} onChange={handleSignUpChange} required /></td>
              </tr>
              <tr>
                <td><label>Email:</label></td>
                <td><input type="email" name="email" className="inputField" value={signUpData.email} onChange={handleSignUpChange} required /></td>
              </tr>
              <tr>
                <td><label>Street:</label></td>
                <td><input type="text" name="street" className="inputField" value={signUpData.address.street} onChange={handleSignUpChange} required /></td>
              </tr>
              <tr>
                <td><label>Suburb:</label></td>
                <td><input type="text" name="suburb" className="inputField" value={signUpData.address.suburb} onChange={handleSignUpChange} required /></td>
              </tr>
              <tr>
                <td><label>City:</label></td>
                <td><input type="text" name="city" className="inputField" value={signUpData.address.city} onChange={handleSignUpChange} required /></td>
              </tr>
              <tr>
                <td><label>State:</label></td>
                <td><input type="text" name="state" className="inputField" value={signUpData.address.state} onChange={handleSignUpChange} required /></td>
              </tr>
              <tr>
                <td><label>Postcode:</label></td>
                <td><input type="text" name="postcode" className="inputField" value={signUpData.address.postcode} onChange={handleSignUpChange} required /></td>
              </tr>
              <tr>
                <td><label>Mobile:</label></td>
                <td><input type="tel" name="mobile" className="inputField" value={signUpData.mobile} onChange={handleSignUpChange} required /></td>
              </tr>
              <tr>
                <td><label>Password:</label></td>
                <td><input type="password" name="password" className="inputField" value={signUpData.password} onChange={handleSignUpChange} required /></td>
              </tr>
            </tbody>
          </table>
          <button type="submit" className="signUpButton">Sign Up</button>
          <button
            type="button"
            className="signInSwitch"
            onClick={() => setShowSignUp(false)}
          >
            Switch to Sign In
          </button>
        </form>
      )}

      {isSignedIn && (
        <div>
          <p>You are logged in.</p>
          <button id="signOutButton" onClick={handleSignOut}>Sign Out</button>
        </div>
      )}
    </div>
  );
};

export default Cart;