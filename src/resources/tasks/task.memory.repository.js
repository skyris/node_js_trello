const DB = require('../../utils/inMemoryDb');
const NOT_FOUND_ERROR = require('../../errors/appError');
const TABLE_NAME = 'Tasks';

const readAll = async () => {
  return DB.readAll(TABLE_NAME);
};

const read = async id => {
  const task = await DB.read(TABLE_NAME, id);
  if (!task) {
    throw new NOT_FOUND_ERROR(`Couldn't find a task with id: ${id}`);
  }

  return task;
};

const remove = async id => {
  if (!(await DB.remove(TABLE_NAME, id))) {
    throw new NOT_FOUND_ERROR(`Couldn't find a task with id: ${id}`);
  }
};

const create = async user => {
  return DB.create(TABLE_NAME, user);
};

const update = async (id, task) => {
  const element = await DB.update(TABLE_NAME, id, task);
  if (!element) {
    throw new NOT_FOUND_ERROR(`Couldn't find a task with id: ${id}`);
  }

  return element;
};

module.exports = { readAll, read, remove, create, update };
