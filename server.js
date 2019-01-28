const express = require("express");
const app = express();
const passport = require("passport");
const cookieSession = require("cookie-session");
const keys = require("./config/keys");
const mongoose = require("mongoose");
require("./services/passport");

mongoose
    .connect(
        keys.mongoDB_URI,
        { useNewUrlParser: true }
    )
    .then(() => console.log("Connected to DB"))
    .catch(() => console.error("Ooops"));

app.use(express.json());
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

require("./startup/routes")(app);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("Server start on port " + port));
