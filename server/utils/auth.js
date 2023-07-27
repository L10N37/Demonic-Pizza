const jwt = require('jsonwebtoken');

const signToken = (user) => {
  const payload = {
    email: user.email,
    name: user.name,
    _id: user._id,
  };

  return jwt.sign({ data: payload }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

module.exports = { signToken };
