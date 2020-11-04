const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY, PATH_WHITELIST } = require('../../common/config');
const logger = require('../../common/logger');

module.exports = (req, res, next) => {
  if (PATH_WHITELIST.includes(req.path)) return next();
  try {
    const authHeader = req.header('Authorization');
    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer') {
      throw Error('Wrong auth schema');
    }
    const result = jwt.verify(token, JWT_SECRET_KEY);

    if (result) return next();
  } catch (e) {
    logger.writeError(e.stack, req);
    res.status(401).send('Unauthorized user!');
  }
};
