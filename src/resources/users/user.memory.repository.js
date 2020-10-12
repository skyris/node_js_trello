const DB = require('../../utils/inMemoryDb');
const NOT_FOUND_ERROR = require('../../errors/appError');
const TABLE_NAME = 'Users';

const readAll = async () => {
  return DB.readAll(TABLE_NAME);
};

const read = async id => {
  const user = await DB.read(TABLE_NAME, id);
  if (!user) {
    throw new NOT_FOUND_ERROR(`Couldn't find a user with id: ${id}`);
  }

  return user;
};

const remove = async id => {
  if (!(await DB.remove(TABLE_NAME, id))) {
    throw new NOT_FOUND_ERROR(`Couldn't find a user with id: ${id}`);
  }
};

const create = async user => {
  return DB.create(TABLE_NAME, user);
};

const update = async (id, user) => {
  const element = await DB.update(TABLE_NAME, id, user);
  if (!element) {
    throw new NOT_FOUND_ERROR(`Couldn't find a user with id: ${id}`);
  }

  return element;
};

module.exports = { readAll, read, remove, create, update };
