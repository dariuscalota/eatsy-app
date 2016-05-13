const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define our model
const commentSchema = new Schema({
  user: { type: String },
  date: {type: Date },
  modified: {type: Date },
  event: { type: String },
  text: {type: String },
  status: {type: Boolean }
});
