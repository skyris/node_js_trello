const tasksRepo = require('./task.db.repository');

const find = propsObject => tasksRepo.find(propsObject);

const findOne = propsObject => tasksRepo.findOne(propsObject);

const remove = propsObject => tasksRepo.remove(propsObject);

const create = task => {
  return tasksRepo.create(task);
};

const update = (propsObject, taskData) => {
  return tasksRepo.update(propsObject, taskData);
};

module.exports = { find, findOne, remove, create, update };
