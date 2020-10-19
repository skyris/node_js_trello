const uuid = require('uuid');
const { selectRandom, generatePassword } = require('../../utils/common');
const { userNames, userLogins } = require('../../utils/data');

class User {
  constructor({
    id = uuid(),
    name = selectRandom(userNames),
    login = selectRandom(userLogins),
    password = generatePassword(8)
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }

  static fromRequest(body) {
    return new User(body);
  }

  update(body) {
    const { name, login, password } = body;
    if (name !== undefined && this.name !== name) {
      this.name = name;
    }
    if (login !== undefined && this.login !== login) {
      this.login = login;
    }
    if (password !== undefined && this.password !== password) {
      this.password = password;
    }
  }
}

module.exports = User;
