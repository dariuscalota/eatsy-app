const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');
const User = require('./models/user');
const Interest = require('./models/interest');
const Event =  require('./models/event')

const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignin = passport.authenticate('local', {session: false});

module.exports = function(app) {

  app.get('/api/users', requireAuth, function(req, res) {
      User.find({}, function(err, users) {
        res.json(users);
    });
  });
  app.get('/api/users/:id', function(req, res) {
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
        user.picture = user.picture;
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

  app.get('/api/events', requireAuth , function(req, res) {
    res.send(requireAuth.done.user);
  });
  app.get('/api/events/:id' , function(req, res) {
    Event.find({'_id': req.params.id}, function(err, events) {
      res.json(events);
    });
  });

  app.use(function(req, res){
    res.send(404);
});
}
