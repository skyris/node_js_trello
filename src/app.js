const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const loginRouter = require('./resources/login/login.router');
const errorHandle = require('./errors/errorHandle');
const logger = require('./common/logger');
const checkToken = require('./utils/auth/checkToken');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/', checkToken);

app.use('/login', loginRouter);
app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards/:boardId/tasks', taskRouter);

app.use(errorHandle);

process.on('unhandledRejection', (reason, err) => {
  console.error('Unhandled Rejection at Promise \n', err);
  logger.error(`UnhandledRejection: ${reason.stack}`);
});
process.on('uncaughtException', err => {
  console.error(err.stack);
});

module.exports = app;
