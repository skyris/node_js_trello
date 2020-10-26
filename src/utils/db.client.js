const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('../common/config');
const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');
const { selectRandom, generatePassword } = require('../utils/common');
const {
  userNames,
  userLogins,
  columnTitles,
  boardTitles,
  taskDescriptions
} = require('../utils/data');

const initiateData = () => {
  const users = [
    new User({
      name: selectRandom(userNames),
      login: selectRandom(userLogins),
      password: generatePassword()
    }),
    new User({
      name: selectRandom(userNames),
      login: selectRandom(userLogins),
      password: generatePassword()
    }),
    new User({
      name: selectRandom(userNames),
      login: selectRandom(userLogins),
      password: generatePassword()
    })
  ];

  const boards = [
    new Board({
      title: selectRandom(boardTitles),
      columns: [
        {
          title: selectRandom(columnTitles),
          order: 0
        },
        {
          title: selectRandom(columnTitles),
          order: 1
        }
      ]
    })
  ];

  const boardId = boards[0]._id;
  const columnId = boards[0].columns[0]._id;
  const userId = users[0]._id;

  const tasks = [
    new Task({
      title: selectRandom(columnTitles),
      order: 0,
      description: selectRandom(taskDescriptions),
      userId,
      boardId,
      columnId
    }),
    new Task({
      title: selectRandom(columnTitles),
      order: 1,
      description: selectRandom(taskDescriptions),
      userId,
      boardId,
      columnId
    })
  ];

  users.forEach(user => user.save());
  boards.forEach(board => board.save());
  tasks.forEach(task => task.save());
};

const connectToDB = cb => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log("we're connected!");
  });
  db.dropDatabase();
  initiateData();
  cb();
};

module.exports = { connectToDB };
