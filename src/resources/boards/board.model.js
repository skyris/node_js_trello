const uuid = require('uuid');
const { selectRandom } = require('../../utils/common');
const { boardTitles } = require('../../utils/data');
const Column = require('../columns/column.model');

class Board {
  constructor({
    id = uuid(),
    title = selectRandom(boardTitles),
    columns = []
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  addColumn(column) {
    this.column.push(column);
  }

  static toResponse(board) {
    const { id, title, columns } = board;
    const jsonColumns = columns.map(column => column.toResponse());
    return { id, title, columns: jsonColumns };
  }

  static fromRequest(body) {
    const { columns = [] } = body;
    const board = new Board({
      ...body,
      columns: columns.map(Column.fromRequest)
    });
    return board;
  }
}

module.exports = Board;
