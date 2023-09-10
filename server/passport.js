const passport = require('passport');

var GoogleStrategy = require('passport-google-oauth20').Strategy;

const GOOGLE_CLIENT_ID ="419103764744-fl9efmg8ad3emequ7pv3n5ii4k3jc982.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
        done(null, profile)
    }
));
passport.serializeUser((user,done)=>{
    done(null,user)
})
passport.deserializeUser((user,dont)=>{
    done(null,user)
})

