const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define our model
const interestSchema = new Schema({
  name: { type: String },
  points: {type: Number }
});
