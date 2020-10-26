const NOT_FOUND_ERROR = require('../../errors/appError');
const Board = require('./board.model');

const readAll = async () => {
  return Board.find({});
};

const read = async id => {
  const output = await Board.findOne({ _id: id });
  if (!output) {
    throw new NOT_FOUND_ERROR(`Couldn't find a board with id: ${id}`);
  }

  return output;
};

const remove = async id => {
  const output = await Board.remove({ _id: id });
  if (!output.deletedCount) {
    throw new NOT_FOUND_ERROR(`Couldn't find a board with id: ${id}`);
  }

  return output;
};

const create = async board => {
  return Board.create(board);
};

const update = async (propsObject, boardData) => {
  const { id } = propsObject;
  const output = await Board.updateOne({ _id: id }, boardData);
  if (!output.nModified) {
    throw new NOT_FOUND_ERROR(`Couldn't find a board with id: ${id}`);
  }

  return Board.findOne({ _id: id });
};

module.exports = { readAll, read, remove, create, update };
