const express = require('express');
const app = express();

const bodyparser = require('body-parser')
const cookieParser = require('cookie-parser')
const ejs = require('ejs')
const mongoose = require('mongoose');
const methodOverride = require('method-override')

// const session = require('express-session')
// app.use(passport.session())

const passport = require("passport");

const {uri, PORT} = require('./Xconfig')
let port = process.env.PORT;
if (port == null || port ===""){
    port = PORT;
}

app.set("view engine", "ejs")
app.use('/static', express.static('static'))
app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())
app.use(cookieParser())
app.use(methodOverride('_method'))
app.use(express.json())

//      \/
app.use(passport.initialize())
require('./middleware/passport-jwt')(passport);
//      /\

try {
    mongoose.connect(uri);

    app.use("/", require("./routers/index"))
    app.use("/", require("./routers/about"))
    app.use("/", require("./routers/workpage"))
    app.use("/", require("./routers/login"))
    app.use("/", require("./routers/reg"))
    app.use("/", require("./routers/adminRouter"))
    app.use("/", require("./routers/fail"))
    // app.use("/", require("./routers/workouts"))

    app.use("/", require("./routers/accessed/about"))
    app.use("/", require("./routers/accessed/index"))
    app.use("/", require("./routers/accessed/workpage"))
    // app.use("/", require("./routers/accessed/workouts"))

    app.use('/', require('./routers/google'))

    app.listen(port, () => {
        console.log(`App was launched on http://localhost:${PORT}`)
    })
} catch (e) {
    console.log("Something went wrong!" +
        "" + e)
}

