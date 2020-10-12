const uuid = require('uuid');
const { selectRandom } = require('../../utils/common');
const { boardTitles, descriptions } = require('../../utils/data');

class Task {
  constructor({
    id = uuid(),
    title = selectRandom(boardTitles),
    order = 0,
    description = selectRandom(descriptions),
    userId = null,
    boardId = null,
    columnId = null
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static toResponse(task) {
    const { id, title, order, description, userId, boardId, columnId } = task;
    return { id, title, order, description, userId, boardId, columnId };
  }

  static fromRequest(body) {
    return new Task(body);
  }
}

module.exports = Task;
