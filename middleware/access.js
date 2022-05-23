const path = require("path")

module.exports = function (req, res, next){
        if (req.cookies.token){
            // console.log(req.cookies.token)
            next();
        } else {
            res.render(path.resolve('pages/authfail.ejs'));
        }
}