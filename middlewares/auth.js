const jwt = require('jsonwebtoken');
const extractBearer = (header) => header.replace('Bearer ', '');
const userAuthorization = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthorizationError('Необходима авторизация');
  }
  const token = extractBearer(authorization);
  let payload;
  try {
    payload = jwt.verify(token, 'very secret');
  }
  req.user = payload;
  next();
};

module.exports = {
  userAuthorization,
};