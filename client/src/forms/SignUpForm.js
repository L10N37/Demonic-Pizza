import React from 'react';

const SignUpForm = ({signUpData, handleSignUpChange, handleSignUp, setShowSignUp}) => (
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
);

export default SignUpForm;
