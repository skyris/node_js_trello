const NOT_FOUND_ERROR = require('../../errors/appError');
const User = require('../users/user.model');

const readAll = async () => {
  return User.find({});
};

const read = async id => {
  const output = await User.findOne({ _id: id });
  if (!output) {
    throw new NOT_FOUND_ERROR(`Couldn't find a user with id: ${id}`);
  }

  return output;
};

const remove = async id => {
  const output = await User.deleteOne({ _id: id });
  if (!output.deletedCount) {
    throw new NOT_FOUND_ERROR(`Couldn't find a user with id: ${id}`);
  }

  return output;
};

const create = async user => {
  return User.create(user);
};

const update = async (propsObject, userData) => {
  const { id } = propsObject;
  const output = await User.updateOne({ _id: id }, userData);
  if (!output.nModified) {
    throw new NOT_FOUND_ERROR(`Couldn't find a user with id: ${id}`);
  }

  return User.findOne({ _id: id });
};

module.exports = { readAll, read, remove, create, update };
