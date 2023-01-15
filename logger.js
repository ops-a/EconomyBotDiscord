const { createLogger, format, transports } = require("winston");
const { combine, label, prettyPrint, timestamp } = format;

const logger = createLogger({
  level: "info",
  format: combine(label({ label: "right meow!" }), timestamp(), prettyPrint()),
  defaultMeta: { service: "user-service" },
  transports: [
    new transports.File({ filename: "logs/error.log", level: "error" }),
    new transports.File({
      filename: "combined.log",
    }),
  ],
});

module.exports = logger;
