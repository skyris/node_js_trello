const tasksRepo = require('./task.memory.repository');

const find = propsObject => tasksRepo.find(propsObject);

const findOne = propsObject => tasksRepo.findOne(propsObject);

const remove = propsObject => tasksRepo.remove(propsObject);

const create = task => {
  return tasksRepo.create(task);
};

const update = (propsObject, task) => tasksRepo.update(propsObject, task);

module.exports = { find, findOne, remove, create, update };
