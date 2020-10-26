const mongoose = require('mongoose');
const columnSchema = require('../columns/column.model');
const uuid = require('uuid');

const boardSchema = new mongoose.Schema(
  {
    title: String,
    columns: [columnSchema],
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

boardSchema.statics.toResponse = board => {
  const { id, title, columns } = board;
  return { id, title, columns };
};

const Board = mongoose.model('Board', boardSchema);

// class Board {
//   constructor({
//     id = uuid(),
//     title = selectRandom(boardTitles),
//     columns = []
//   } = {}) {
//     this.id = id;
//     this.title = title;
//     this.columns = columns;
//   }

//   addColumn(column) {
//     this.column.push(column);
//   }

//   static toResponse(board) {
//     const { id, title, columns } = board;
//     const jsonColumns = columns.map(column => column.toResponse());
//     return { id, title, columns: jsonColumns };
//   }

//   static fromRequest(body) {
//     const { columns = [] } = body;
//     const board = new Board({
//       ...body,
//       columns: columns.map(Column.fromRequest)
//     });
//     return board;
//   }

//   update(body) {
//     const { title, columns } = body;
//     if (title !== undefined && this.title !== title) {
//       this.title = title;
//     }
//     if (columns !== undefined && Array.isArray(columns)) {
//       for (const column of this.columns) {
//         columns
//           .filter(col => col.id)
//           .forEach(col => {
//             if (col.id === column.id) {
//               column.merge(col);
//             }
//           });
//       }
//     }
//   }
// }

module.exports = Board;
