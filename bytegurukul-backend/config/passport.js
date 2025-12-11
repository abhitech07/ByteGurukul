const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const { User } = require('../models');

// User ID ko session/token ke liye serialize karna
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// ID se wapas user dhundna
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// --- GOOGLE STRATEGY ---
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_ID !== 'dummy_google_id_123') {
  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ where: { email: profile.emails[0].value } });

        if (!user) {
          user = await User.create({
            username: profile.displayName.replace(/\s+/g, '').toLowerCase() + Date.now(),
            name: profile.displayName,
            email: profile.emails[0].value,
            password: 'null', 
            role: 'student', // FIXED: Lowercase for consistency
            authProvider: 'google'
          });
        }
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  ));
} else {
  console.log("⚠️  Google Auth skipped: Client ID/Secret not set");
}

// --- GITHUB STRATEGY ---
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_ID !== 'dummy_github_id_123') {
  passport.use(new GitHubStrategy({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "/api/auth/github/callback",
      scope: ['user:email']
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
        if (!email) return done(new Error("No email public on GitHub"), null);

        let user = await User.findOne({ where: { email } });

        if (!user) {
          user = await User.create({
            username: profile.username,
            name: profile.displayName || profile.username,
            email: email,
            password: 'null',
            role: 'student', // FIXED: Lowercase for consistency
            authProvider: 'github'
          });
        }
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  ));
} else {
  console.log("⚠️  GitHub Auth skipped: Client ID/Secret not set");
}

module.exports = passport;