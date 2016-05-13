const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');
const User = require('./models/user');

const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignin = passport.authenticate('local', {session: false});

module.exports = function(app) {
  app.get('/', function(req, res) {
      console.log('1');
    });
  });
  app.post('/signin', requireSignin,  Authentication.signin);
  app.post('/signup', Authentication.signup);
}
