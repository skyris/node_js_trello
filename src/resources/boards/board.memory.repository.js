const DB = require('../../utils/inMemoryDb');
const NOT_FOUND_ERROR = require('../../errors/appError');
const TABLE_NAME = 'Boards';

const readAll = async () => {
  return DB.readAll(TABLE_NAME);
};

const read = async id => {
  const board = await DB.read(TABLE_NAME, id);
  if (!board) {
    throw new NOT_FOUND_ERROR(`Couldn't find a board with id: ${id}`);
  }

  return board;
};

const remove = async id => {
  if (!(await DB.remove(TABLE_NAME, id))) {
    throw new NOT_FOUND_ERROR(`Couldn't find a board with id: ${id}`);
  }
};

const create = async board => {
  return DB.create(TABLE_NAME, board);
};

const update = async (id, board) => {
  const element = await DB.update(TABLE_NAME, id, board);
  if (!element) {
    throw new NOT_FOUND_ERROR(`Couldn't find a board with id: ${id}`);
  }

  return element;
};

module.exports = { readAll, read, remove, create, update };
