const jwt = require('jsonwebtoken')
const {secret} = require('../Xconfig')

module.exports = function (req, res, next){
    if (req.method === "OPTIONS"){
        next();
    }
    try {
        const getToken = req.headers.authorization.split(' ')
        const token = getToken[1];

        if (!token){
            return res.status(403).json({message: "User is not authorised"})
        }
        const decodedData = jwt.verify(token, secret);
        req.user = decodedData;
        next();
    } catch (e){
        console.log(e);
        res.status(403).json({message: "User is not authorised"})
    }
}