const jwt = require('jwt-simple');
const Comment = require('../models/comment');

exports.createComment = function(req, res, next) {
  const user = req.body.user;
  const event = req.body.event;
  const date = new Date();
  const modified = new Date();
  const text = req.body.text;

  const status = 1;

  const comment = new Comment({
    user: user,
    event: event,
    date: date,
    modified: modified,
    text: text,
    status, status
  });
  comment.save(function(err) {
    if (err) {
      return next(err);
    }
    res.json({ comment: (comment) });
  });
}
exports.getEventComments = function(req, res, next) {
  Comment.find({"event": req.params.event}, function(err, comments) {
    res.json({ comments: (comments) });
  });
}
exports.editComment =  function(req, res, next) {
  Comment.findOne({'_id': req.params.id}, function(err, comment) {

    if (req.body.text)
      comment.text = req.body.text;
    if (req.body.status)
      comment.status = req.body.status;
    comment.modified = new Date();
    comment.save(function(err) {
      if (err) {
        return next(err);
      }
      res.json({ comment: (comment) });
    });
 });
}
