const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define our model
const eventSchema = new Schema({
  // event description
  title: { type: String },
  location: {type: String },
  description: {type: String },
  picture: {type: String},
  owner: {type: String },
  start: {type: Date },
  end: {type: Date },
  interests: {type: Array },
  comments: {type: Array },
  attendees: {type: Array },
  created: {type: Date },
  // metadata
  modified: {type: Date },
  status: {type: Number },
  invites: {type: Array },
  points: {type: Number }
});

const ModelClass = mongoose.model('event', eventSchema);
module.exports = ModelClass;
