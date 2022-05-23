const Router = require('express').Router;
const router = new Router();
const passport = require("passport");

const userGoogle = require('../models/UserGoogle')
const jwt = require("jsonwebtoken");
const {secret} = require("../Xconfig");

router
    .route('/google')
    .get(authGoogle, passport.authenticate('google', { scope: ['profile'] }));
router
    .route('/google/callback')
    .get(authGoogle, passport.authenticate('google', { failureRedirect: '/login' }),
        function(req, res) {
            res.redirect('/index_accessed');
        })
module.exports = router;

//function below is kind of middleware to sign an ID for each user, without this it does not work
async function authGoogle(req, res, next){
    let newUser = new userGoogle()
    let authorizationToken = `Bearer ${generateAccessToken(newUser.googleId, newUser._id)}`;
    res.cookie('token', authorizationToken, {maxAge: 4 * 60 * 60 * 1000});
    // console.log(authorizationToken)
    next();
}

function generateAccessToken(googleId, id){
    const payload = {
        googleId,
        id
    }
    return jwt.sign(payload, secret, {expiresIn: "4h"})
}