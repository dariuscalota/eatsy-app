const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// define our model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase:true },
  name: { type: String },
  password: {type: String },
  location: {type: String },
  picture: {type: String },
  interest: {type: Array }
});

// on save hook, encrypt password
// before saving a model, run this function
userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if(err) { return callback(err); }
    callback(null, isMatch);
  });
}

// create the model class
const ModelClass = mongoose.model('user', userSchema);

// export the model
module.exports = ModelClass;
