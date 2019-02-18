const express = require("express");
const winston = require("winston");
const app = express();

require("./startup")(app);

const port = process.env.PORT || 5000;

app.listen(port, () => winston.info("Server start on port " + port));
