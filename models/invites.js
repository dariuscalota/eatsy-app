const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define our model
const inviteSchema = new Schema({
  sender: { type: String },
  reciever: {type: String },
  event: { type: String },
  date: {type: Date },
  status: {type: Number }
});

const ModelClass = mongoose.model('invite', inviteSchema);
module.exports = ModelClass;
