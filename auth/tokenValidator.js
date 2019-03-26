const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

module.exports.validateToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: 'Could not authenticate token', error: err });
      }
      req.decoded = decoded;
      // return res.send("Valid token")

      return next();
    });
  } else {
    return res.status(401)
      .send({ message: "No token provided. Provide token in the request body, or header, or in a query, with key 'x-access-token'", success: false });
  }
};
