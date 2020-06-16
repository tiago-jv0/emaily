const passport = require('passport');

module.exports = (app) => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    })
  );

  app.get('/auth/google/callback', passport.authenticate('google'), (req, resp) => {
    resp.redirect('/surveys');
  });

  app.get('/api/logout', (req, resp) => {
    req.logout();
    return resp.status(200).redirect('/');
  });

  app.get('/api/current_user', (req, resp) => {
    return resp.status(200).json({
      status: 'success',
      data: {
        user: req.user,
      },
    });
  });
};
