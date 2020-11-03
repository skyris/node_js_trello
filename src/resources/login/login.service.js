const jwt = require('jsonwebtoken');
const loginRepo = require('./login.db.repository');
const { checkHash } = require('../../utils/auth/hashHelpers');
const { JWT_SECRET_KEY } = require('../../common/config');

const signToken = async (login, password) => {
  const user = await loginRepo.read(login);
  console.log('user: ', user);
  if (!user) return null;

  const comparisonRes = await checkHash(password, user.password);
  console.log('comparisonRes: ', comparisonRes);
  if (!comparisonRes) return null;

  const { id } = user;
  const token = jwt.sign({ id, login }, JWT_SECRET_KEY);
  return token;
};

module.exports = { signToken };
