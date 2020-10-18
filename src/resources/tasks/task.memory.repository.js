const DB = require('../../utils/inMemoryDb');
const NOT_FOUND_ERROR = require('../../errors/appError');
const TABLE_NAME = 'Tasks';

const find = async propsObject => {
  const tasks = await DB.filterByProperties(TABLE_NAME, propsObject);
  return tasks;
};

const findOne = async propsObject => {
  const tasks = await find(propsObject);
  return tasks[0];
};

// const read = async (boardId, id) => {
//   const tasks = await find({ boardId, id });
//   const task = tasks.filter(t => t.id === id);
//   if (!task.length) {
//     throw new NOT_FOUND_ERROR(`Couldn't find a task with id ${id}`);
//   } else if (task.length > 1) {
//     throw Error('The DB data is wrong!');
//   }

//   return task[0];
// };

const remove = async propsObject => {
  await DB.filterByProperties(TABLE_NAME, propsObject);
  await DB.remove(TABLE_NAME, propsObject.id);
};

const create = async (boardId, task) => {
  return DB.create(TABLE_NAME, boardId, task);
};

const update = async (propsObject, task) => {
  await DB.filterByProperties(TABLE_NAME, propsObject);
  const element = await DB.update(TABLE_NAME, propsObject.id, task);
  if (!element) {
    throw new NOT_FOUND_ERROR(
      `Couldn't find a task with id: ${propsObject.id}`
    );
  }

  return element;
};

module.exports = { find, findOne, remove, create, update };
