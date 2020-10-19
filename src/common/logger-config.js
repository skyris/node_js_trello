const options = {
  format: 'YYYY-MM-DD HH:mm:ss',
  error: {
    level: 'info',
    filename: './logs/info.log',
    handleExceptions: false,
    timestamp: true,
    json: true,
    maxsize: 5242880,
    maxFiles: 5
  },
  info: {
    filename: './logs/error.log',
    level: 'error',
    handleExceptions: true,
    json: true,
    timestamp: true,
    maxsize: 5242880,
    maxFiles: 5
  }
};

module.exports = options;
