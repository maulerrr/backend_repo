const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const {secret} = require('../Xconfig')
const User = require('../models/User')

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret,
}

module.exports = function (passport){
    passport.use(
        new JwtStrategy(options, async (payload, done)=>{
            try {
                const user = await User.findById(payload.userId).select('_id roles')

                if (user){
                    done(null, user)
                } else {
                    done(null, false)
                }
            } catch (e) {
                console.log(e + " kosyak!")
            }
        })
    )
}