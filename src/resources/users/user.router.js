const router = require('express').Router();
const usersService = require('./user.service');
const User = require('./user.model');
const wrapAsync = require('../../utils/wrapAsync');

router.route('/').get(
  wrapAsync(async (req, res) => {
    const users = await usersService.readAll();
    res.json(users.map(User.toResponse));
  })
);

router.route('/:id').get(
  wrapAsync(async (req, res) => {
    const user = await usersService.read(req.params.id);
    res.status(200).send(User.toResponse(user));
  })
);

router.route('/:id').delete(
  wrapAsync(async (req, res) => {
    await usersService.remove(req.params.id);
    res.sendStatus(200);
  })
);

router.route('/').post(
  wrapAsync(async (req, res) => {
    const user = await usersService.create(User.fromRequest(req.body));
    res.status(200).send(User.toResponse(user));
  })
);

router.route('/:id').put(
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const user = await usersService.update({ id }, req.body);
    res.status(200).send(User.toResponse(user));
  })
);

module.exports = router;
