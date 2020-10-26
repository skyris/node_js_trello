const router = require('express').Router({ mergeParams: true });
const tasksService = require('./task.service');
const Task = require('./task.model');
const wrapAsync = require('../../utils/wrapAsync');

router.route('/').get(
  wrapAsync(async (req, res) => {
    const { boardId } = req.params;
    const tasks = await tasksService.find({ boardId });
    res.json(tasks.map(Task.toResponse));
  })
);

// router.route('/:id').get(
//   wrapAsync(async (req, res) => {
//     const { boardId, id } = req.params;
//     const task = await tasksService.findOne({ boardId, id });
//     res.status(200).send(Task.toResponse(task));
//   })
// );

// router.route('/:id').delete(
//   wrapAsync(async (req, res) => {
//     const { boardId, id } = req.params;
//     await tasksService.remove({ boardId, id });
//     res.sendStatus(200);
//   })
// );

router.route('/').post(
  wrapAsync(async (req, res) => {
    const { boardId } = req.params;
    const task = await tasksService.create({ ...req.body, boardId });
    res.status(200).send(Task.toResponse(task));
  })
);

// router.route('/:id').put(
//   wrapAsync(async (req, res) => {
//     const { boardId, id } = req.params;
//     const task = await tasksService.update({ boardId, id }, req.body);
//     res.status(200).send(Task.toResponse(task));
//   })
// );

module.exports = router;
