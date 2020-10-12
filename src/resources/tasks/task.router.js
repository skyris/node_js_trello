const router = require('express').Router();
const tasksService = require('./task.service');
const Task = require('./task.model');
const wrapAsync = require('../../utils/wrapAsync');

router.route('/').get(
  wrapAsync(async (req, res) => {
    const tasks = await tasksService.readAll();
    res.json(tasks.map(Task.toResponse));
  })
);

router.route('/:id').get(
  wrapAsync(async (req, res) => {
    const task = await tasksService.read(req.params.id);
    res.status(200).send(Task.toResponse(task));
  })
);

router.route('/:id').delete(
  wrapAsync(async (req, res) => {
    await tasksService.remove(req.params.id);
    res.sendStatus(200);
  })
);

router.route('/').post(
  wrapAsync(async (req, res) => {
    const task = await tasksService.create(Task.fromRequest(req.body));
    res.status(200).send(Task.toResponse(task));
  })
);

router.route('/:id').put(
  wrapAsync(async (req, res) => {
    const task = await tasksService.update(
      req.params.id,
      Task.fromRequest({ ...req.body, id: req.params.id })
    );
    res.status(200).send(Task.toResponse(task));
  })
);

module.exports = router;
