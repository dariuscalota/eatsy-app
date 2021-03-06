const jwt = require('jwt-simple');
const Event = require('../models/event');
const User = require('../models/user');

exports.createEvent = function(req, res, next) {
  const title = req.body.title;
  const location = req.body.location;
  const description = req.body.description;
  const picture = req.body.picture;
  const owner = req.body.owner;
  const start = new Date();
  const end = new Date();
  const invites = req.body.invites;
  const interests = req.body.interests;
  const points = 0;

  const comments = [];
  const attendees = [];
  const status = 0;
  const created = new Date();
  const modified = new Date();

  const event = new Event({
    title: title,
    location: location,
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
    modified: modified,
    points: points
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

function getAttendeesArray(eventID, next,callback){
  Event.findOne({'_id': eventID}, function(err, event) {
    callback(event.attendees);
  });
}
exports.fetchEventUsers = function(req, res) {
  var eventId =  req.params.event;
  getAttendeesArray(eventId,null, function(data) {
    User.find({'_id': { $in: data} }, function(err, user) {
        res.json(user);
    });
  })

}
exports.editEvent =  function(req, res, next) {
  Event.findOne({'_id': req.params.id}, function(err, event) {

    if (req.body.title)
      event.title = req.body.title;
    if (req.body.location)
      event.location = req.body.location;
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

exports.fetchEventPriority = function(req, res, next) {
  const userLocation =  req.params.location;
  const userInterests =  req.params.interests.split("&");
  Event.find({}, function(err, events) {
    var eventsSize = events.length;
    for (var i = 0; i < eventsSize; i++) {
        var points = 0;
        var interestSize = events[i].interests.length;
        for (var j = 0; j < interestSize; j++) {
          for (var k = 0; k < userInterests.length; k++)
            if (events[i].interests[j] == userInterests[k])
              points += 10;
        }
        if (userLocation == events[i].location)
          points += 50;
        events[i].points = points;
    }
    res.json({ events: (events) });
  });
}
