const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'your_jwt_secret'; // replace 'your_jwt_secret' with your actual secret

// Function to create a token
exports.signToken = function(user) {
  return jwt.sign(
    { 
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName 
    }, 
    secret,
    {
      expiresIn: '1d' // token will expire in 1 day
    }
  );
};
