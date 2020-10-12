const notFoundError = require('./appError');

const errorHandle = async (err, req, res, next) => {
  console.error(err.stack);
  if (err instanceof notFoundError) {
    res.status(err.status).send(err.message);
  } else if (err) {
    res.status(500).send('Some error happened!');
  }
  next();
};

module.exports = errorHandle;
