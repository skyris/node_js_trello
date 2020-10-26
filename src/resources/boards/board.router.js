const router = require('express').Router();
const boardsService = require('./board.service');
const Board = require('./board.model');
const wrapAsync = require('../../utils/wrapAsync');

router.route('/').get(
  wrapAsync(async (req, res) => {
    const boards = await boardsService.readAll();
    res.json(boards.map(Board.toResponse));
  })
);

router.route('/:id').get(
  wrapAsync(async (req, res) => {
    const board = await boardsService.read(req.params.id);
    res.status(200).send(Board.toResponse(board));
  })
);

router.route('/:id').delete(
  wrapAsync(async (req, res) => {
    await boardsService.remove(req.params.id);
    res.sendStatus(200);
  })
);

router.route('/').post(
  wrapAsync(async (req, res) => {
    const board = await boardsService.create(req.body);
    res.status(200).send(Board.toResponse(board));
  })
);

router.route('/:id').put(
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const board = await boardsService.update({ id }, req.body);
    res.status(200).send(Board.toResponse(board));
  })
);

module.exports = router;
