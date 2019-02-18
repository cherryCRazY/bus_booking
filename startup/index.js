const express = require("express");

module.exports = function(app) {
    app.use(express.json());
    require("express-async-errors");

    require("./database")();
    require("./validate")();

    require("../services/passport");
    require("./auth")(app);

    require("./logging");
    require("./globalErrorHandler")();
    
    require("./routes")(app);
};
