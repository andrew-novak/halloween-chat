const { createLogger, format, transports } = require("winston");
const {
  combine,
  errors,
  align,
  timestamp,
  splat,
  json,
  printf,
  colorize,
} = format;
const { Console } = transports;

const colorizer = colorize();

const logger = createLogger({
  level: "silly",
  format: combine(
    errors({ stack: true }),
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    splat(),
    json(),
    printf(({ stack, timestamp, label, level, message }) => {
      let output = "";
      // error
      if (stack) {
        output = stack;
      }
      // object
      else if (typeof message === "object")
        output = JSON.stringify(message, null, 3);
      // string
      else output = `[${timestamp}] [${level}] ${message}`;
      return colorizer.colorize(level, output);
    })
  ),
  transports: [new Console()],
});

module.exports = logger;
