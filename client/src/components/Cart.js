import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import '../assets/css/SignInPage.css';
import { useStoreContext } from '../contexts/CartContext';
import { SIGNUP_MUTATION, LOGIN_MUTATION } from '../utils/mutations';
import { GET_ME } from '../utils/queries';
import SignInForm from '../forms/signInForm';
import SignUpForm from '../forms/SignUpForm';

const Cart = () => {
  const [isDelivery, setDelivery] = useState(() => localStorage.getItem('isDelivery') === 'true');
  const [showSignUp, setShowSignUp] = useState(false);
  const [state, dispatch] = useStoreContext();
  const { cart } = state;
  const [isSignedIn, setIsSignedIn] = useState(false);

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
      const { token, user } = data.addUser;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setIsSignedIn(true);
      localStorage.setItem('isSignedIn', 'true');
    } catch (err) {
      console.error(err);
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
      localStorage.setItem('isSignedIn', 'true');
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const isSignedInLocalStorage = localStorage.getItem('isSignedIn');
    setIsSignedIn(isSignedInLocalStorage === 'true');
  }, []);

  const handleSignOut = () => {
    dispatch({ type: 'CLEAR_CART' });
    localStorage.removeItem('isSignedIn');
    localStorage.removeItem('isDelivery');
    window.location.reload();
  };

  const totalCartPrice = cart.reduce((total, cartItem) => total + cartItem.totalPrice, 0);
  const totalCartPriceWithDelivery = isDelivery ? totalCartPrice + 12.99 : totalCartPrice;

  useEffect(() => {
    localStorage.setItem('isDelivery', isDelivery);
  }, [isDelivery]);

  // Fetch user data
  const { loading, error, data } = useQuery(GET_ME, {
    context: {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
  });

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
                <th>Price Each</th>
                <th>Total Price</th>
                <th>Crust</th>
                <th>Extras</th>
              </tr>
            </thead>
            <tbody>
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
              <tr>
                <td>
                  <label htmlFor="delivery">
                    <input
                      type="checkbox"
                      id="delivery"
                      checked={isDelivery}
                      onChange={() => setDelivery(prevDelivery => !prevDelivery)}
                    />
                    Add delivery for $12.99
                  </label>
                </td>
                <td>Total Price:</td>
                <td>${totalCartPriceWithDelivery.toFixed(2)}</td>
              </tr>
              {isDelivery && !loading && data?.me && (
                <tr>
                  <td colSpan="6">
                    <div id = "userDetails">
                      <p><strong>First Name:</strong> {data.me.firstName}</p>
                      <p><strong>Last Name:</strong> {data.me.lastName}</p>
                      <p><strong>Mobile:</strong> {data.me.mobile}</p>
                      <p><strong>Address:</strong> {`${data.me.address.street}, ${data.me.address.suburb}, ${data.me.address.city}, ${data.me.address.state}, ${data.me.address.postcode}`}</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

    {isSignedIn && cart.length === 0 && (
            <p id = "cartEmptyText">Your cart is empty</p>
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
          isSignedIn={isSignedIn}
        />
      )}

      {isSignedIn && (
        <div>
          <p>You are logged in.</p>
          <button id = 'signOutButton' onClick={handleSignOut}>Sign Out</button>
        </div>
      )}

      
    </div>
  );
};

export default Cart;
