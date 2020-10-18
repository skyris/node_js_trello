const boardsRepo = require('./board.memory.repository');

const readAll = () => boardsRepo.readAll();

const read = id => boardsRepo.read(id);

const remove = id => boardsRepo.remove(id);

const create = board => {
  return boardsRepo.create(board);
};

const update = (id, board) => boardsRepo.update(id, board);

module.exports = { readAll, read, remove, create, update };
