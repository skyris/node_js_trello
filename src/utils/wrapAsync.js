const { isFunction } = require('./common');
const logger = require('../common/logger');

function wrapRoute(fn) {
  if (!isFunction(fn)) {
    throw new Error(`fn ${fn.name} should be a function`);
  }
  return (req, res, next) => {
    const result = fn(req, res, next); // result is Promise
    logger.writeInfo(req);
    if (result && result.catch) {
      result.catch(next);
    }
  };
}

function wrapAsync(obj) {
  if (Array.isArray(obj)) {
    return obj.map(wrapAsync);
  }
  return wrapRoute(obj);
}

module.exports = wrapAsync;
