const winston = require("winston");
const path = require("path");

// Winston error levels in order of priority (highest to lowest)
/**errorLevels in winston 
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6
*/

const transports = [
  new winston.transports.Console({
    level: "info",
    format: winston.format.combine(winston.format.colorize()),
  }),
  new winston.transports.File({
    level: "info",
    filename: path.join(__dirname, "../..", "info.log"),
    format: winston.format.json(),
  }),
  new winston.transports.File({
    level: "error",
    filename: path.join(__dirname, "../..", "error.log"),
    format: winston.format.json(),
  }),
];

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf(
      (info) => `${info.timestamp} [${info.level}] : ${info.message}`
    )
  ),
  transports: transports,
});

module.exports = logger;
