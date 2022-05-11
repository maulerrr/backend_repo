const jwt = require('jsonwebtoken')
const {secret} = require('../Xconfig')

module.exports = function (roles) {
    return function(req, res, next) {
        if (req.method === "OPTIONS"){
            next();
        }
        try {
            const getToken = req.headers.authorization.split(' ')
            const token = getToken[1];

            if (!token){
                return res.status(403).json({message: "User is not authorised"})
            }

            const {roles: userRoles} = jwt.verify(token, secret);
            let hasRole = false;
            userRoles.forEach(role => {
                if (roles.includes(role)){
                    hasRole = true;
                }
            })

            if (!hasRole){
                return res.status(403).json({message: "User does not have a permission!"})
            }
            next();
        } catch (e){
            console.log(e);
            res.status(403).json({message: "User is not authorised"})
        }
    }
}