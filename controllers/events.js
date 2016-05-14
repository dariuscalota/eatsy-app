const jwt = require('jwt-simple');
const Event = require('../models/event');
const User = require('../models/user');

exports.createEvent = function(req, res, next) {
  const title = req.body.title;
  const description = req.body.description;
  const picture = req.body.picture;
  const owner = req.body.owner;
  const start = new Date();
  const end = new Date();
  const invites = req.body.invites;
  const interests = req.body.interests;

  const comments = [];
  const attendees = [];
  const status = 0;
  const created = new Date();
  const modified = new Date();

  const event = new Event({
    title: title,
    description: description,
    picture: picture,
    owner: owner,
    start: start,
    end, end,
    invites: invites,
    interests: interests,
    comments: comments,
    attendees: attendees,
    status: status,
    created: created,
    modified: modified
  });
  event.save(function(err) {
    if (err) {
      return next(err);
    }
    res.json({ event: (event) });
  });
}
exports.fetchEvents = function(req, res, next) {
  Event.find({}, function(err, events) {
    res.json(events);
  });
}
exports.fetchEvent = function(req, res, next) {
  Event.find({'_id': req.params.id}, function(err, event) {
    res.json(event);
  });
}
exports.fetchEventUsers = function(req, res, next) {
  Event.findOne({'_id': req.params.id}, function(err, event) {
    var userArray = event.attendees;
    var arrayLength = userArray.length;
    var usersEvent = [];
    for (var i = 0; i < arrayLength; i++) {
      User.find({'_id': userArray[i]}, function(err, user) {
        usersEvent.push(user);
      });
    }
    res.json(usersEvent);
  });
}
exports.editEvent =  function(req, res, next) {
  Event.findOne({'_id': req.params.id}, function(err, event) {

    if (req.body.title)
     event.title = req.body.title;
    if (req.body.description)
      event.description = req.body.description;
    if (req.body.location)
      event.location = req.body.location;
    if (req.body.picture)
      event.picture = req.body.picture;;
    if (req.body.start)
      event.start = req.body.start;

    if (req.body.invites)
      event.invites = event.invites.concat(req.body.invites);
    if (req.body.interests)
      event.interests = event.interests.concat(req.body.interests);
    if (req.body.comments)
      event.comments = event.comments.concat(req.body.comments);
    if (req.body.attendees)
      event.attendees = event.attendees.concat(req.body.attendees);

    if (req.body.status)
      event.status = req.body.status;
    event.modified = new Date();
    event.save(function(err) {
      if (err) {
        return next(err);
      }
      res.json({ event: (event) });
    });

 });
}
