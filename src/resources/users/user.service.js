const usersRepo = require('./user.db.repository');
const { createHash } = require('../../utils/auth/hashHelpers');

const readAll = () => usersRepo.readAll();

const read = id => usersRepo.read(id);

const findByProps = props => usersRepo.findByProps(props);

const remove = id => usersRepo.remove(id);

const create = async userData => {
  const hash = await createHash(userData.password);
  return usersRepo.create({ ...userData, password: hash });
};

const update = async (propsObject, userData) => {
  const { password } = userData;
  if (password !== undefined) {
    const hash = await createHash(password);
    userData = { ...userData, password: hash };
  }
  return usersRepo.update(propsObject, userData);
};

module.exports = {
  readAll,
  read,
  remove,
  create,
  update,
  findByProps
};
