const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');
const Column = require('../resources/columns/column.model');
const NOT_FOUND_ERROR = require('../errors/appError');

const db = {
  Users: [],
  Boards: [],
  Tasks: [],
  fixUsersStructure: user => {
    if (user) {
      db.Tasks.filter(task => task).forEach(task => {
        task.userId = task.userId === user.id ? null : task.userId;
      });
    }
  },
  fixBoardsStructure: board => {
    if (board) {
      db.Tasks.filter(task => task)
        .filter(task => task.boardId === board.id)
        .forEach(task => (db.Tasks[db.Tasks.indexOf(task)] = undefined));
    }
  },
  fixTasksStructure: task => {
    console.log('Task: ', task);
  }
};
// ------------------------------------------------------------------
// init DB with mock data
// ------------------------------------------------------------------
(() => {
  const users = [];
  for (let i = 0; i < 3; i++) {
    users.push(new User());
  }
  db.Users.push(...users);
  const columns = [new Column(), new Column({ order: 1 })];
  const board = new Board({ columns });
  db.Boards.push(board);
  db.Tasks.push(
    new Task({
      boardId: board.id,
      userId: users[0].id,
      columnId: columns[0].id
    }),
    new Task({
      boardId: board.id,
      userId: users[1].id,
      columnId: columns[0].id
    })
  );
})();
// ------------------------------------------------------------------

const readAll = tableName => {
  return db[tableName].filter(element => element);
};

const read = (tableName, id) => {
  const elements = db[tableName]
    .filter(element => element)
    .filter(element => element.id === id);

  if (elements.length > 1) {
    console.error(
      `The DB data is damaged. Table ${tableName}. Element ID: ${id}`
    );
    throw Error('The DB data is wrong!');
  }

  return elements[0];
};

const filterByProperties = (tableName, propsObject) => {
  let elements = db[tableName];
  for (const key of Object.keys(propsObject)) {
    elements = elements
      .filter(element => element)
      .filter(element => element[key] === propsObject[key]);
    if (!elements.length) {
      throw new NOT_FOUND_ERROR(
        `Couldn't find a ${tableName} with ${key} ${propsObject[key]}`
      );
    }
  }

  return elements;
};

const remove = async (tableName, id) => {
  const element = read(tableName, id);
  if (element) {
    db[`fix${tableName}Structure`](element);
    const index = db[tableName].indexOf(element);
    db[tableName] = [
      ...db[tableName].slice(0, index),
      ...(db[tableName].length > index + 1
        ? db[tableName].slice(index + 1)
        : [])
    ];
  }

  return element;
};

const create = async (tableName, element) => {
  db[tableName].push(element);

  return read(tableName, element.id);
};

const update = async (tableName, propsObject, newData) => {
  const oldElement = filterByProperties(tableName, propsObject)[0];
  if (oldElement) {
    oldElement.update(newData);
  }

  return read(tableName, propsObject.id);
};

module.exports = {
  readAll,
  read,
  remove,
  create,
  update,
  filterByProperties
};
