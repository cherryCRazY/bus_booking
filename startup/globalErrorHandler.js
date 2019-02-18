const winston = require("winston");

const gehStartup = () => {
    process.on("uncaughtException", ex => {
        winston.error(ex.stack || ex.message, ex);
        process.exit(-1);
    });
    process.on("unhandledRejection", ex => {
        winston.error(ex.stack || ex.message, ex);
        process.exit(-1);
    });
};

module.exports = gehStartup;
