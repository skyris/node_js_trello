const Task = require('./task.model');
const NOT_FOUND_ERROR = require('../../errors/appError');

const find = async propsObject => {
  const output = await Task.find(propsObject).exec();
  return output;
};

const findOne = async propsObject => {
  const { id: _id, boardId } = propsObject;
  const output = await Task.findOne({ _id, boardId }).exec();
  if (!output) {
    throw new NOT_FOUND_ERROR(
      `Couldn't find a task with id: ${_id} and boardId: ${boardId}`
    );
  }

  return output;
};

const remove = async propsObject => {
  const { id: _id, boardId } = propsObject;
  const output = await Task.deleteOne({ _id, boardId });
  if (!output.deletedCount) {
    throw new NOT_FOUND_ERROR(
      `Couldn't find a task with id: ${_id} and boardId: ${boardId}`
    );
  }

  return output;
};

const create = async task => {
  return Task.create(task);
};

const update = async (propsObject, taskData) => {
  const { id: _id, boardId } = propsObject;
  const output = await Task.updateOne({ _id, boardId }, taskData);
  if (!output.nModified) {
    throw new NOT_FOUND_ERROR(
      `Couldn't find a task with id: ${_id} and boardId: ${boardId}`
    );
  }

  return Task.findOne({ _id });
};

module.exports = { find, findOne, remove, create, update };
