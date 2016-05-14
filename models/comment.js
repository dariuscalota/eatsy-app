const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Event = require('../models/event');

// define our model
const commentSchema = new Schema({
  user: { type: String },
  event: { type: String },
  date: {type: Date },
  modified: {type: Date },
  text: {type: String },
  status: {type: Number }
});
