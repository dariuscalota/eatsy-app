const Authentication = require('./controllers/authentication');
const EventController = require('./controllers/events');
const CommentController = require('./controllers/comments');
const InvitesController = require('./controllers/invites');


const passportService = require('./services/passport');
const passport = require('passport');

const User = require('./models/user');
const Invite = require('./models/invites');
const Interest = require('./models/interest');

const ExtractJwt = require('passport-jwt').ExtractJwt;
const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignin = passport.authenticate('local', {session: false});

module.exports = function(app) {

  app.get('/api/users', requireAuth, function(req, res) {
      User.find({}, function(err, users) {
        res.json(users);
    });
  });
  app.get('/api/users/:id', requireAuth, function(req, res) {
     User.find({'_id': req.params.id}, function(err, user) {
       res.json(user);
     });
   });
  app.put('/api/users/:id', requireAuth, function(req, res) {
     User.findOne({'_id': req.params.id}, function(err, user) {
       if (req.body.email)
        user.email = req.body.email;
       if (req.body.name)
        user.name = req.body.name;
       if (req.body.location)
         user.location = req.body.location;
       if (req.body.interest)
         user.interest = user.interest.concat(req.body.interest);
       if (req.body.picture)
        user.picture = req.body.picture;
      user.isCreated = 7;
       user.save(function(err) {
         if (err) {
           return next(err);
         }
         res.json({ user: (user) });
       });

    });
  });

  app.post('/api/signin', requireSignin,  Authentication.signin);
  app.post('/api/signup', Authentication.signup);

  app.get('/api/interests' , requireAuth, function(req, res) {
    Interest.find({}, function(err, interests) {
      res.json(interests);
    });
  });
  app.get('/api/interests/:id' , requireAuth, function(req, res) {
    Interest.find({'_id': req.params.id}, function(err, interests) {
      res.json(interests);
    });
  });

  app.post('/api/events', requireAuth, EventController.createEvent);
  app.get('/api/events', requireAuth, EventController.fetchEvents);
  app.get('/api/events/:id', requireAuth, EventController.fetchEvent);
  app.put('/api/events/:id', requireAuth, EventController.editEvent);
  app.get('/api/events/users/:id', requireAuth, EventController.fetchEventUsers);
  app.get('/api/events/priority/:location/:interests', requireAuth, EventController.fetchEventPriority);

  app.post('/api/comments', requireAuth, CommentController.createComment);
  app.get('/api/comments', requireAuth, CommentController.getEventComments);
  app.put('/api/comments/:id', requireAuth, CommentController.editComment);

  app.post('/api/invite', requireAuth, function(req, res) {

      const status = 0;
      const date = new Date();
      const sender = req.body.sender;
      const event = req.body.event;
      var arrsize = req.body.reciever.length;
      const current = "";
      var invite = new Invite({
          status: status,
          sender: sender,
          event: event,
          date: date,
          reciever: current
      });
      for (var i = 0; i < arrsize; ++i) {
        invite.reciever = req.body.reciever[i];
        invite.save(function(err) {
          if (err) {
            return next(err);
          }
        });
      }
     res.send("Added");
  });
  app.get('/api/invites/:id', requireAuth, InvitesController.fetchInvite);
  app.get('/api/invites/user/:id', requireAuth, InvitesController.fetchUserInvites);

  app.use(function(req, res){
    res.send(404);
});
}
