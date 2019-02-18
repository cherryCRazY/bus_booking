const winston = require("winston");

const loggingStartup = () => {
    // Create winston format
    const alignedWithColorsAndTime = winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.align(),
        winston.format.printf(info => {
            const { timestamp, level, message, ...args } = info;

            const ts = timestamp.slice(0, 19).replace("T", " ");
            return `${ts} [${level}]: ${message} ${
                Object.keys(args).length ? JSON.stringify(args, null, 2) : ""
            }`;
        })
    );

    // Log to console setup
    winston.add(
        new winston.transports.Console({
            format: alignedWithColorsAndTime,
            colorize: true
        })
    );
};

module.exports = loggingStartup;
