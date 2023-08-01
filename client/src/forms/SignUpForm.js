import React from 'react';

const SignUpForm = ({ signUpData, handleSignUpChange, handleSignUp, setShowSignUp }) => {
  return (
    <form className="signUpForm" onSubmit={handleSignUp}>
      <table>
        <tbody>
          <tr>
            <td>
              <label htmlFor="firstName">First Name:</label>
            </td>
            <td>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={signUpData.firstName}
                onChange={handleSignUpChange}
                className="inputField"
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="lastName">Last Name:</label>
            </td>
            <td>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={signUpData.lastName}
                onChange={handleSignUpChange}
                className="inputField"
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="email">Email:</label>
            </td>
            <td>
              <input
                type="email"
                id="email"
                name="email"
                value={signUpData.email}
                onChange={handleSignUpChange}
                className="inputField"
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="mobile">Mobile:</label>
            </td>
            <td>
              <input
                type="text"
                id="mobile"
                name="mobile"
                value={signUpData.mobile}
                onChange={handleSignUpChange}
                className="inputField"
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="street">Street:</label>
            </td>
            <td>
              <input
                type="text"
                id="street"
                name="address.street"
                value={signUpData.address.street}
                onChange={handleSignUpChange}
                className="inputField"
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="suburb">Suburb:</label>
            </td>
            <td>
              <input
                type="text"
                id="suburb"
                name="address.suburb"
                value={signUpData.address.suburb}
                onChange={handleSignUpChange}
                className="inputField"
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="city">City:</label>
            </td>
            <td>
              <input
                type="text"
                id="city"
                name="address.city"
                value={signUpData.address.city}
                onChange={handleSignUpChange}
                className="inputField"
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="state">State:</label>
            </td>
            <td>
              <input
                type="text"
                id="state"
                name="address.state"
                value={signUpData.address.state}
                onChange={handleSignUpChange}
                className="inputField"
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="postcode">Postcode:</label>
            </td>
            <td>
              <input
                type="text"
                id="postcode"
                name="address.postcode"
                value={signUpData.address.postcode}
                onChange={handleSignUpChange}
                className="inputField"
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="password">Password:</label>
            </td>
            <td>
              <input
                type="password"
                id="password"
                name="password"
                value={signUpData.password}
                onChange={handleSignUpChange}
                className="inputField"
              />
            </td>
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
  );
};

export default SignUpForm;
