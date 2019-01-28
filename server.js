const express = require("express");
const app = express();
const passport = require("passport");

require("./services/passport");

app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth/google", require("./routes/auth"));
const port = process.env.PORT || 5000;

app.listen(port, () => console.log("Server start on port " + port));
