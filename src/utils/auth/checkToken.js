const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config');

const PATH_WHITELIST = ['/', '/doc', '/login'];

module.exports = (req, res, next) => {
  if (PATH_WHITELIST.includes(req.path)) return next();
  const authHeader = req.header('Authorization');

  if (authHeader !== undefined) {
    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer') {
      res.status(401).send('Wrong auth schema!');
    } else {
      const result = jwt.verify(token, JWT_SECRET_KEY);

      if (result) {
        return next();
      }
    }
  }

  res.status(401).send('Unauthorized user!');
};
