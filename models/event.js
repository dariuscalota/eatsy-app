const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define our model
const eventSchema = new Schema({
  title: { type: String, unique: true, lowercase:true },
  description: {type: String },
  owner: {type: String },
  created: {type: Date },
  modified: {type: Date },
  start: {type: Date },
  end: {type: Date },
  status: {type: Number },
  attendees: {type: Array },
  invites: {type: Array },
  comments: {type: Array }
});

const ModelClass = mongoose.model('event', eventSchema);
module.exports = ModelClass;
