const NOT_FOUND_ERROR = require('../../errors/appError');
const User = require('../users/user.model');

const read = async login => {
  const output = await User.findOne({ login });
  if (!output) {
    throw new NOT_FOUND_ERROR(`Couldn't find a user with login: ${login}`);
  }

  return output;
};

module.exports = { read };
