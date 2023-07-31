import React from 'react';

const SignInForm = ({signInData, handleSignInChange, handleSignIn, setShowSignUp}) => (
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
);

export default SignInForm;
