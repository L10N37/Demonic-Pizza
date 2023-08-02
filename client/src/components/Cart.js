// console.log(localStorage.getItem('token'));

import React, { useState, useEffect } from 'react';
import '../assets/css/SignInPage.css'; // Styling
import { useStoreContext } from '../contexts/CartContext';
import { useMutation } from '@apollo/client';
import { SIGNUP_MUTATION, LOGIN_MUTATION } from '../utils/mutations';
import SignInForm from '../forms/signInForm';
import SignUpForm from '../forms/SignUpForm';

const Cart = () => {
  const [isDelivery, setDelivery] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [state, dispatch] = useStoreContext();
  const { cart } = state;

  const [signInData, setSignInData] = useState({ email: '', password: '' });
  const [signUpData, setSignUpData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: { street: '', suburb: '', city: '', state: '', postcode: '' },
    mobile: '',
    password: '',
  });

  const [addUser] = useMutation(SIGNUP_MUTATION);
  const [loginUser] = useMutation(LOGIN_MUTATION);

  const handleSignInChange = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSignUpChange = (event) => {
    const { name, value } = event.target;
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setSignUpData((prevSignUpData) => ({
        ...prevSignUpData,
        address: {
          ...prevSignUpData.address,
          [addressField]: value,
        },
      }));
    } else {
      setSignUpData((prevSignUpData) => ({
        ...prevSignUpData,
        [name]: value,
      }));
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const { data } = await addUser({ variables: { ...signUpData, address: { ...signUpData.address } } });
      console.log("Sign Up Data:", data);
      const { token, user } = data.addUser; // corrected here
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
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
      console.log("Login Data:", data);
      const { token, user } = data.login;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setIsSignedIn(true);
      localStorage.setItem('isSignedIn', 'true'); // Set login status in local storage after successful sign in
    } catch (err) {
      console.error(err);
      // handle error
    }
  };

  useEffect(() => {
    const isSignedInLocalStorage = localStorage.getItem('isSignedIn');
    setIsSignedIn(isSignedInLocalStorage === 'true'); // Set isSignedIn to true only if localStorage['isSignedIn'] is 'true'
  }, []);

  const handleSignOut = () => {
    dispatch({ type: 'CLEAR_CART' });
    localStorage.removeItem('isSignedIn');
    window.location.reload(); // reload on sign out to reset the page
  };

  const [isSignedIn, setIsSignedIn] = useState(false); // Initialize isSignedIn as false

  const totalCartPrice = cart.reduce((total, cartItem) => total + cartItem.totalPrice, 0);
  const totalCartPriceWithDelivery = isDelivery ? totalCartPrice + 12.99 : totalCartPrice;

  return (
    <div className="signInContainer">
      {/* Check if the user is signed in and the cart has items */}
      {isSignedIn && cart.length > 0 && (
        <div>
          <h2>Cart Contents</h2>
          {/* Render the cart contents in a table */}
          <table>
            {/* Table header */}
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price Each</th>
                <th>Total Price</th>
                <th>Crust</th>
                <th>Extras</th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody>
              {/* Map through the cart items and display them in rows */}
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.purchaseQuantity}</td>
                  <td>${item.totalPrice ? (item.totalPrice / item.purchaseQuantity).toFixed(2) : ''}</td>
                  <td>${item.totalPrice ? item.totalPrice.toFixed(2) : ''}</td>
                  <td>{item.crust || ''}</td>
                  <td>{item.extras ? item.extras.join(', ') : ''}</td>
                </tr>
              ))}
              {/* Additional row for the delivery option */}
              <tr>
                <td>
                  <label htmlFor="delivery">
                    <input
                      type="checkbox"
                      id="delivery"
                      checked={isDelivery}
                      onChange={() => setDelivery(prevDelivery => !prevDelivery)}
                    />
                    Add delivery for 12.99
                  </label>
                </td>
                <td>Total Price:</td>
                <td>${totalCartPriceWithDelivery.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* If the user is not signed in and not showing the sign-up form, show the sign-in form */}
      {!isSignedIn && !showSignUp && (
        <SignInForm
          signInData={signInData}
          handleSignInChange={handleSignInChange}
          handleSignIn={handleSignIn}
          setShowSignUp={setShowSignUp}
        />
      )}

      {/* If the user is not signed in and showing the sign-up form, show the sign-up form */}
      {!isSignedIn && showSignUp && (
        <SignUpForm
          signUpData={signUpData}
          handleSignUpChange={handleSignUpChange}
          handleSignUp={handleSignUp}
          setShowSignUp={setShowSignUp}
          isSignedIn={isSignedIn} // Pass isSignedIn to SignUpForm
        />
      )}

      {/* If the user is signed in, display a message and a "Sign Out" button */}
      {isSignedIn && (
        <div>
          <p>You are logged in.</p>
          <button id="signOutButton" onClick={handleSignOut}>Sign Out</button>
        </div>
      )}

      {/* If the user is signed in but the cart is empty, show "Your cart is empty" */}
      {isSignedIn && cart.length === 0 && (
        <p id = "cartEmptyText">Your cart is empty</p>
      )}
    </div>
  );
};

export default Cart;
