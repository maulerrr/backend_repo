const User = require('../models/User')
const Role = require('../models/Role')
const bcrypt = require('bcrypt')
const {validationResult, body} = require('express-validator')
const jwt = require('jsonwebtoken')
const {secret} = require('../Xconfig')
const bodyParser = require("body-parser");
const path = require("path");


function generateAccessToken(id, roles){
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, {expiresIn: "18h"})
}

class authCtrl{
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                // return res.status(400).json({message: "Some ERROR OCCURRED! Try again!"}, errors)
                return res.status(400).render(path.resolve("pages/authfail.ejs"))
            }

            // const {username, email , password} = req.body;
            const username = req.body.username;
            const email = req.body.email;
            const password =req.body.password;

            const candidate = await User.findOne({username})
            if(candidate){
                // return res.status(400).json({message: "User with such name already exists!"})
                return res.status(400).render(path.resolve("pages/authfail.ejs"))
            }

            const hashedPassword = bcrypt.hashSync(password, 6);
            const userRole = await Role.findOne({value: "USER"});
            const user = new User({username, email, password: hashedPassword, roles: [userRole.value]});
            await user.save();
            // return res.json({message: "User has been successfully registered!"})
            res.status(200).redirect("index_accessed")
        }  catch (e) {
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
            if (!user){
                // return res.status(400).json({message: 'User with name: ' + username + ' was not found!'})
                res.status(400).render(path.resolve("pages/authfail.ejs"))
            }
            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword){
                return res.status(400).render(path.resolve("pages/authfail.ejs"))
            }

            const token = generateAccessToken(user._id, user.roles);

            res.status(200).redirect("index_accessed")
        }  catch (e) {
            console.log(e)
            res.status(400).render(path.resolve("pages/authfail.ejs"))
        }
    }

    // async delete(req, res){
    //     try {
    //         const {username} = req.body;
    //         let deletedUser = User.deleteOne({username})
    //         if (!deletedUser){
    //             return res.status(400).json({message: "This user cannot be deleted by some reason!"})
    //         }
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }
}

module.exports = new authCtrl();