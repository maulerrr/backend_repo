const User = require('../models/User')
const Role = require('../models/Role')
const bcrypt = require('bcrypt')
const {validationResult, body} = require('express-validator')
const jwt = require('jsonwebtoken')
const {secret} = require('../Xconfig')
const bodyParser = require("body-parser");


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
                return res.status(400).json({message: "Some ERROR OCCURRED! Try again!"}, errors)
            }

            // const {username, email , password} = req.body;
            const username = req.body.username;
            const email = req.body.email;
            const password =req.body.password;

            const candidate = await User.findOne({username})
            if(candidate){
                return res.status(400).json({message: "User with such name already exists!"})
            }

            const hashedPassword = bcrypt.hashSync(password, 6);
            const userRole = await Role.findOne({value: "USER"});
            const user = new User({username, email, password: hashedPassword, roles: [userRole.value]});
            await user.save();
            return res.json({message: "User has been successfully registered!"})

        }  catch (e) {
            console.log(e)
            res.status(400).json({message: "Registration failed"})
        }
    }
    async login(req, res) {
        try {
            const username = req.body.username;
            const password = req.body.password;

            // const {username, password} = req.body;

            const user = await User.findOne({username})
            if (!user){
                return res.status(400).json({message: 'User with name: ' + username + ' was not found!'})
            }
            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword){
                return res.status(400).json({message: "Incorrect password!"})
            }

            const token = generateAccessToken(user._id, user.roles);
            return res.json({token});

        }  catch (e) {
            console.log(e)
            res.status(400).json({message: "Log In failed"})
        }
    }
    // async getUsers(req, res) {
    //     try {
    //         const users = await User.find();
    //         res.json(users);
    //     }  catch (e) {
    //         console.log(e)
    //     }
    // }
    //
    // async update(req, res){
    //     try {
    //         let user = !!User.updateOne({user: req.body});
    //
    //         if (user){
    //             res.json({message:"User has been successfully updated!"})
    //         } else {
    //             res.status(400).json({message: "Updating failed!"})
    //         }
    //     }  catch (e) {
    //         console.log(e)
    //     }
    // }
    //
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