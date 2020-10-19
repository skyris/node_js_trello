const { createLogger, transports, format } = require('winston');
const options = require('./logger-config.js');

const customFormat = format.printf(({ message, timestamp: time }) => {
  return `${time} ${message}`;
});

const logger = new createLogger({
  format: format.combine(
    format.timestamp({ format: options.format }),
    customFormat
  ),
  transports: [
    new transports.File(options.info),
    new transports.File(options.error)
  ]
});

const str = data => JSON.stringify(data);

const cleaningPassword = obj => {
  const { password, ...newObj } = obj;
  String(password); // Just to overcome eslint
  return newObj;
};

const Logger = {
  writeInfo: req => {
    const { method, originalUrl, body, params } = req;
    logger.info(
      `Method: ${method}, URL: ${originalUrl}, Body:${str(
        cleaningPassword(body)
      )}, Params:${str(params)}`
    );
  },
  info: data => logger.info(data),
  error: data => logger.error(data),
  writeError: (msg, req) => {
    const { method, originalUrl, body, params } = req;
    logger.error(
      `Method: ${method}, URL: ${originalUrl}, Body:${str(
        cleaningPassword(body)
      )}, Params:${str(params)} Message: ${msg}`
    );
  }
};

module.exports = Logger;
