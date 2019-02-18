const mongoose = require("mongoose");
const keys = require("../config/keys");
const winston = require("winston");

module.exports = function() {
    mongoose
        .connect(keys.mongoDB_URI, {
            useNewUrlParser: true,
            useCreateIndex: true
        })
        .then(() => winston.info("Connected to DB"));
};
