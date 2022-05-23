const User = require('../models/User')
const Role = require('../models/Role')
const bcrypt = require('bcrypt')
const {validationResult, body, cookie} = require('express-validator')
const jwt = require('jsonwebtoken')
const {secret} = require('../Xconfig')
const path = require("path");
const {request} = require("express");
const {signedCookies} = require("cookie-parser");

function generateAccessToken(id, roles){
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, {expiresIn: "4h"})
}

class authCtrl {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                // return res.status(400).json({message: "Some ERROR OCCURRED! Try again!"}, errors)
                return res.status(400).render(path.resolve("pages/authfail.ejs"))
            }

            // const {username, email , password} = req.body;
            const username = req.body.username;
            const email = req.body.email;
            const password = req.body.password;

            const candidate = await User.findOne({username})
            if (candidate) {
                // return res.status(400).json({message: "User with such name already exists!"})
                return res.status(400).render(path.resolve("pages/authfail.ejs"))
            }

            const hashedPassword = bcrypt.hashSync(password, 6);
            const userRole = await Role.findOne({value: "USER"});
            const user = new User({username, email, password: hashedPassword, roles: [userRole.value]});
            await user.save();

            const token = generateAccessToken(user._id, user.roles);

            let authorizationToken = `Bearer ${token}`
            res.cookie('token', authorizationToken, {maxAge: 4 * 60 * 60 * 1000})

            // return res.json({message: "User has been successfully registered!"})
            res.status(200).redirect("index_accessed")
        } catch (e) {
            console.log(e)
            // res.status(400).json({message: "Registration failed"})
            res.status(400).render(path.resolve("pages/authfail.ejs"))

        }
    }

    async login(req, res) {
        try {
            const username = req.body.username;
            const password = req.body.password;

            // const {username, password} = req.body;

            const user = await User.findOne({username})
            if (!user) {
                // return res.status(400).json({message: 'User with name: ' + username + ' was not found!'})
                res.status(400).render(path.resolve("pages/authfail.ejs"))
            }
            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(400).render(path.resolve("pages/authfail.ejs"))
            }


            const token = generateAccessToken(user._id, user.roles);

            let authorizationToken = `Bearer ${token}`
            res.cookie('token', authorizationToken, {maxAge: 4 * 60 * 60 * 1000})

            res.status(200).redirect("index_accessed")
        } catch (e) {
            console.log(e)
            res.status(400).render(path.resolve("pages/authfail.ejs"))
        }
    }
}

module.exports = new authCtrl();