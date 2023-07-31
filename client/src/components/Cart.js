import React, { useState } from 'react';
import { useStoreContext } from '../contexts/CartContext';
import '../assets/css/SignInPage.css';
import { useMutation } from '@apollo/client';
import { SIGNUP_MUTATION, LOGIN_MUTATION } from '../utils/mutations';
import SignInForm from '../forms/signInForm';
import SignUpForm from '../forms/SignUpForm';

const Cart = () => {
  const [isDelivery, setDelivery] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [state, dispatch] = useStoreContext();
  const { cart } = state;
  
  const [signInData, setSignInData] = useState({ email: '', password: '' });  // New state
  const [signUpData, setSignUpData] = useState({ 
    firstName: '', 
    lastName: '', 
    email: '', 
    address: { street: '', suburb: '', city: '', state: '', postcode: '' }, 
    mobile: '', 
    password: '' 
  });  // New state

  const [addUser] = useMutation(SIGNUP_MUTATION);
  const [loginUser] = useMutation(LOGIN_MUTATION);

  const handleSignInChange = (event) => {  // New method
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSignUpChange = (event) => {  // New method
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSignUp = async (data) => {
    try {
      await addUser({ variables: { ...data, address: { ...data.address } } });
      localStorage.setItem('isSignedIn', 'true');
    } catch (err) {
      console.error(err);
    }
  };

  const handleSignIn = async (data) => {
    try {
      await loginUser({ variables: { ...data } });
      localStorage.setItem('isSignedIn', 'true');
    } catch (err) {
      console.error(err);
    }
  };

  const handleSignOut = () => {
    dispatch({ type: 'CLEAR_CART' });
    localStorage.removeItem('isSignedIn');
  };

  const isSignedInLocalStorage = localStorage.getItem('isSignedIn');
  const [isSignedIn, setIsSignedIn] = useState(!!isSignedInLocalStorage);

  const totalCartPrice = cart.reduce((total, cartItem) => total + cartItem.totalPrice, 0);
  const totalCartPriceWithDelivery = isDelivery ? totalCartPrice + 12.99 : totalCartPrice;

  return (
    <div className="signInContainer">
      {isSignedIn && cart.length > 0 && (
        <div>
          <h2>Cart Contents</h2>
          {/* ...your table code here... */}
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
        </div>
      )}

      {!isSignedIn && !showSignUp && (
        <SignInForm 
          signInData={signInData} 
          handleSignInChange={handleSignInChange}
          handleSignIn={handleSignIn} 
          setShowSignUp={setShowSignUp} 
        />
      )}

      {!isSignedIn && showSignUp && (
        <SignUpForm 
          signUpData={signUpData} 
          handleSignUpChange={handleSignUpChange}
          handleSignUp={handleSignUp} 
          setShowSignUp={setShowSignUp} 
        />
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
