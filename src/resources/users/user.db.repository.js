const NOT_FOUND_ERROR = require('../../errors/appError');
const User = require('./user.model');
const Task = require('../tasks/task.model');

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
  const outputTask = await Task.updateMany({ userId: id }, { userId: null });
  if (!outputTask.ok) {
    throw new NOT_FOUND_ERROR(`Couldn't update tasks with user id: ${id}`);
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
