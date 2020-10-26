const uuid = require('uuid');
const mongoose = require('mongoose');

const columnSchema = new mongoose.Schema(
  {
    title: String,
    order: Number,
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

columnSchema.statics.toResponse = board => {
  const { id, title, column } = board;
  return { id, title, column };
};

module.exports = columnSchema;

// const Column = mongoose.model('Column', columnSchema);

// class Column {
//   constructor({
//     id = uuid(),
//     title = selectRandom(columnTitles),
//     order = 0
//   } = {}) {
//     this.id = id;
//     this.title = title;
//     this.order = order;
//   }

//   toResponse() {
//     const { id, title, order } = this;
//     return { id, title, order };
//   }

//   static fromRequest(body) {
//     return new Column(body);
//   }

//   merge(body) {
//     const { title, order } = body;
//     if (title !== undefined && this.title !== title) {
//       this.title = title;
//     }
//     if (order !== undefined && this.order !== order) {
//       this.order = order;
//     }
//   }
// }

// module.exports = Column;
