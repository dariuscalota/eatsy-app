const jwt = require('jwt-simple');
const Invite = require('../models/invites');
const User = require('../models/user');

exports.fetchInvite = function(req, res, next) {
  Invite.find({'_id': req.params.id}, function(err, invite) {
    if (err) {
      return next(err);
    }
    res.json(invite);
  });
}

exports.fetchUserInvites = function(req, res, next) {
  console.log(req.params.id);
  Invite.find({'reciever': req.params.id}, function(err, invites) {
    if (err) {
      return next(err);
    }
    res.json(invites);
  });
}
