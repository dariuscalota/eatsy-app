const jwt = require('jwt-simple');
const Event = require('../models/event');

exports.createEvent = function(req, res, next) {
  const title = req.body.title;
  const description = req.body.description;
  const picture = req.body.picture;
  const owner =req.body.owner;
  const start = req.body.start;
  const end = req.body.end;
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
    res.json({  });
  });
});

  // respond to request indicating the user was created

}
