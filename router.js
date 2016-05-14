const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');
const User = require('./models/user');

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
  app.use(function(req, res){
    res.send(404);
});
}
