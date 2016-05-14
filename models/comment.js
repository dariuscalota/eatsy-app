const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define our model
const commentSchema = new Schema({
  user: { type: String },
  event: { type: String },
  date: {type: Date },
  modified: {type: Date },
  text: {type: String },
  status: {type: Number }
});
const ModelClass = mongoose.model('comment', commentSchema);
module.exports = ModelClass;
