const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const config = require('config');
const mongoose = require('mongoose');

const User = mongoose.model('Users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: config.get('GOOGLE_CLIENT_ID'),
      clientSecret: config.get('GOOGLE_CLIENT_SECRET'),
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: { $eq: profile.id } });

        if (!user) {
          user = await User.create({ googleId: profile.id });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);
