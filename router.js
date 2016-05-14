const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');
const User = require('./models/user');
const Interest = require('./models/interest')

const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignin = passport.authenticate('local', {session: false});

module.exports = function(app) {
  app.get('/api', requireAuth, function(req, res) {
      User.find({}, function(err, users) {
        res.json(users);
    });
  });
  app.post('/api/signin', requireSignin,  Authentication.signin);
  app.post('/api/signup', Authentication.signup);
  app.get('/api/interests', requireAuth, function(req, res) {
    Interest.find({}, function(err, interests) {
      res.json(interests);
    });
  });
  app.use(function(req, res){
    res.send(404);
});
}
