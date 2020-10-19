const notFoundError = require('./appError');
const logger = require('../common/logger');

const errorHandle = async (err, req, res, next) => {
  console.error(err.stack);
  if (err instanceof notFoundError) {
    logger.writeError(err.message, req);
    res.status(err.status).send(err.message);
  } else if (err) {
    logger.error(err.stack);
    res.status(500).send('Some error happened!');
  }
  next();
};

module.exports = errorHandle;
