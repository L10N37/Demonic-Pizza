// SignIn.js

import React, { useState } from 'react';
import '../assets/css/SignInPage.css';

const SignIn = () => {
    const [signUpData, setSignUpData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: {
            street: '',
            city: '',
            state: '',
            zip: '',
            mobile: ''
        },
        password: ''
    });

    const [signInData, setSignInData] = useState({
        email: '',
        password: ''
    });

    const [showSignUp, setShowSignUp] = useState(false);

    const handleSignUpChange = (e) => {
        if (['street', 'city', 'state', 'zip', 'mobile'].includes(e.target.name)) {
            setSignUpData({
                ...signUpData,
                address: {
                    ...signUpData.address,
                    [e.target.name]: e.target.value
                }
            });
        } else {
            setSignUpData({
                ...signUpData,
                [e.target.name]: e.target.value
            });
        }
    };

    const handleSignInChange = (e) => {
        setSignInData({
            ...signInData,
            [e.target.name]: e.target.value
        });
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        console.log(signUpData);
        // Call API to create user account
    };

    const handleSignIn = (e) => {
        e.preventDefault();
        console.log(signInData);
        // Call API to authenticate user
    };

    return (
        <div className="signInContainer">
            <h1 className="signInTitle">Sign In / Sign Up</h1>

            {!showSignUp && (
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
                    <button type="button" className="signUpSwitch" onClick={() => setShowSignUp(true)}>Switch to Sign Up</button>
                </form>
            )}

            {showSignUp && (
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
                                <td><label>City:</label></td>
                                <td><input type="text" name="city" className="inputField" value={signUpData.address.city} onChange={handleSignUpChange} required /></td>
                            </tr>
                            <tr>
                                <td><label>State:</label></td>
                                <td><input type="text" name="state" className="inputField" value={signUpData.address.state} onChange={handleSignUpChange} required /></td>
                            </tr>
                            <tr>
                                <td><label>Zip:</label></td>
                                <td><input type="text" name="zip" className="inputField" value={signUpData.address.zip} onChange={handleSignUpChange} required /></td>
                            </tr>
                            <tr>
                                <td><label>Mobile:</label></td>
                                <td><input type="number" name="mobile" className="inputField" value={signUpData.address.mobile} onChange={handleSignUpChange} required /></td>
                            </tr>
                            <tr>
                                <td><label>Password:</label></td>
                                <td><input type="password" name="password" className="inputField" value={signUpData.password} onChange={handleSignUpChange} required minLength="5" /></td>
                            </tr>
                        </tbody>
                    </table>
                    <button type="submit" className="signUpButton">Sign Up</button>
                    <button type="button" className="signInSwitch" onClick={() => setShowSignUp(false)}>Switch to Sign In</button>
                </form>
            )}
        </div>
    );
};

export default SignIn;
