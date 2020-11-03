const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

const createHash = async password => {
  const hash = await bcrypt.hash(password, SALT_ROUNDS);
  return hash;
};

const checkHash = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

module.exports = {
  createHash,
  checkHash
};
