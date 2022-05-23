const {Schema} = require('mongoose')
const mongoose = require("mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require("passport")
const findOrCreate = require('mongoose-findorcreate')

const UserGoogle = new Schema({
    googleId: {type: String}
})

UserGoogle.plugin(findOrCreate);

let UserGoogleModel = new mongoose.model("users_google", UserGoogle);

passport.serializeUser((user, done)=>{
    done(null, user.id)
})
passport.deserializeUser((user, done)=>{
    UserGoogleModel.findById(id, function (err, user) {
        done(null, user)
    })
})

passport.use(new GoogleStrategy({
        clientID: "193759398954-cm1fa4rm0j6j9jnlqi147hlnvmdkt8i3.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "https://polar-cliffs-65336.herokuapp.com/google/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
        UserGoogleModel.findOrCreate({ googleId: profile.id }, function (err, user) {
            return cb(err, user);
        });
    }
));

module.exports = UserGoogleModel;


