const usersRepo = require('./user.memory.repository');

const readAll = () => usersRepo.readAll();

const read = id => usersRepo.read(id);

const remove = id => usersRepo.remove(id);

const create = user => {
  return usersRepo.create(user);
};

const update = (id, user) => usersRepo.update(id, user);

module.exports = { readAll, read, remove, create, update };
