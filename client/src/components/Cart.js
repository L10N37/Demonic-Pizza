import React, { useState, useEffect } from 'react';
import '../assets/css/SignInPage.css';                      // Styling
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
    password: '' 
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
      const { token, user } = data.login; // corrected here
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setIsSignedIn(true);
    } catch (err) {
      console.error(err);
      // handle error
    }
  };  

  const handleSignOut = () => {
    dispatch({ type: 'CLEAR_CART' });
    localStorage.removeItem('isSignedIn');
    // setIsSignedIn(false); // This line should be removed or set appropriately
  };

  const [isSignedIn, setIsSignedIn] = useState(false); // Initialize isSignedIn as false

  const totalCartPrice = cart.reduce((total, cartItem) => total + cartItem.totalPrice, 0);
  const totalCartPriceWithDelivery = isDelivery ? totalCartPrice + 12.99 : totalCartPrice;

  useEffect(() => {
    const isSignedInLocalStorage = localStorage.getItem('isSignedIn');
    setIsSignedIn(!!isSignedInLocalStorage);
  }, []);

  return (
    <div className="signInContainer">
      {isSignedIn && cart.length > 0 && (
        <div>
          <h2>Cart Contents</h2>
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>${item.totalPrice.toFixed(2)}</td>
                </tr>
              ))}
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
          isSignedIn={isSignedIn} // Pass isSignedIn to SignUpForm
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
