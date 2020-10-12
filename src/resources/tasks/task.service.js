const tasksRepo = require('./task.memory.repository');
const Task = require('./task.model');

const readAll = () => tasksRepo.readAll();

const read = id => tasksRepo.read(id);

const remove = id => tasksRepo.remove(id);

const create = task => {
  return tasksRepo.create(new Task(task));
};

const update = (id, task) => tasksRepo.update(id, task);

module.exports = { readAll, read, remove, create, update };
