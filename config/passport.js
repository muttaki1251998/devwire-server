require('dotenv').config();
const GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = (passport) => {
  passport.use(
    new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BASE_URL}/api/register/google/callback`
    },
    (accessToken, refreshToken, profile, done) => {
      // In this callback, you will have to implement the logic to save the user information in your database.
      // You can call the 'done' function when you're done, like this: done(null, user);
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    // Here, you would find the user in your database and return it
    // When you're done, call the done function: done(err, user);
  });
}
