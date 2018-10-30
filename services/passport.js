const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id); // id is user model id
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        });
});

// create a new instance of google oauth strategy
passport.use(
    new GoogleStrategy({
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback'
        },
        // callback function, exchange indentifying information
        (accessToken, refreshToken, profile, done) => {
            // does not return the user, but return a promise
            User.findOne({ googleId: profile.id })
                .then((existingUser) => {
                    if(existingUser) {
                        // we already have a record with the given profile ID
                        done(null, existingUser);
                    } else {
                        // we don't have a user record with this ID, make a new record 
                        new User({ googleId: profile.id })
                        .save()
                        .then(user => done(null, user));
                    }
                });
        }
    )
);
