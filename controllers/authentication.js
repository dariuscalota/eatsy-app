const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');
const bcrypt = require('bcrypt-nodejs');


function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(req, res, next) {
  res.send({ token: tokenForUser(req.user), user: (req.user)});
}

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  const location = "";
  const picture = "http://img5.cliparto.com/pic/s/204746/5100273-monochrome-round-user-icon.jpg";
  const interest = [];

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password'});
  }
  // see if a user with the given email exists
  User.findOne({ email: email}, function (err, existingUser) {
    if (err) {
      return next(err);
    }
    // if a user with email does exist, return an error

    if (existingUser) {
      return res.status(422).send({error: 'Email is in use'});
    }
    // if a user with email does not exist, create and save user record
    bcrypt.genSalt(10, function(err, salt) {
      if (err) {
        return next(err);
      }
      // hash our password using the salt
      bcrypt.hash(user.password, salt, null, function(err, hash) {
        if (err) {
          return next(err);
        }
        // overwrite plain text password with encrypted password
        user.password = hash;
      }
    }

    const user = new User({
      email: email,
      password: password,
      name: name,
      location: location,
      picture: picture,
      interest, interest
    });
    user.save(function(err) {
      if (err) {
        return next(err);
      }
      res.json({ token:tokenForUser(user), user: (user) });
    });

  });

  // respond to request indicating the user was created

}
