const express = require('express');
const app = express();
const bodyparser = require('body-parser')
const ejs = require('ejs')
// const authRouter = require("./routers/authRouter")
const mongoose = require('mongoose');
const {uri, PORT} = require('./Xconfig')
let port = process.env.PORT;
if (port == null || port ===""){
    port =PORT;
}


app.set("view engine", "ejs")
app.use('/static', express.static('static'))
app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())

app.use(express.json())



try {
    await mongoose.connect(uri);

    app.use("/", require("./routers/index"))
    app.use("/", require("./routers/about"))
    app.use("/", require("./routers/workpage"))
    app.use("/", require("./routers/login"))
    app.use("/", require("./routers/reg"))
    app.use("/", require("./routers/adminRouter"))
    app.use("/", require("./routers/workouts"))

    app.listen(port, () => {
        console.log(`App was launched on http://localhost:${PORT}`)
    })
} catch (e) {
    console.log("Something went wrong!" +
        "" + e)
}

