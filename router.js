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

  app.get('/api/users:id', requireAuth, function(req, res) {
      User.find({'_id.$oid': req.user.id.$oid}, function(err, user) {
        if(req.user.location) {
          u
        }
    });
  });



  app.post('/api/signin', requireSignin,  Authentication.signin);
  app.post('/api/signup', Authentication.signup);
  app.get('/api/interests' , function(req, res) {
    Interest.find({}, function(err, interests) {
      res.json(interests);
    });
  });
  app.get('/api/event/events/:id' , function(req, res) {
    Event.find({}, function(err, events) {
      res.json(events);
    });
  });

  app.use(function(req, res){
    res.send(404);
});
}
