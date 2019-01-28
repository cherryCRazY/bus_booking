const express = require("express");
const app = express();
const passport = require("passport");
const cookieSession = require("cookie-session");
const keys = require("./config/keys");

require("./services/passport");

app.use(express.json());
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth/google", require("./routes/auth"));
const port = process.env.PORT || 5000;

app.listen(port, () => console.log("Server start on port " + port));
