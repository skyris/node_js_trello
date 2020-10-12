const uuid = require('uuid');
const { selectRandom } = require('../../utils/common');
const { columnTitles } = require('../../utils/data');

class Column {
  constructor({
    id = uuid(),
    title = selectRandom(columnTitles),
    order = 0
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }

  toResponse() {
    const { id, title, order } = this;
    return { id, title, order };
  }

  static fromRequest(body) {
    return new Column(body);
  }
}

module.exports = Column;
