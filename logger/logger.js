const winston = require('winston');

// define the custom settings for each transport (file, console)
const format = {
  infoFile: {
    level: 'info',
    name: 'info.log',
    filename: 'logs/info.log',
    handleExceptions: true,
    json: true,
    maxsize: process.env.MAX_SIZE_FILES, // 5MB
    maxFiles: process.env.MAX_FILES, // 8 files
    colorize: true,
  },
  infoLogs: {
    level: 'info',
    handleExceptions: true,
    json: true,
    colorize: true,
  },
  errorFile: {
    level: 'error',
    name: 'error.log',
    filename: 'logs/error.log',
    handleExceptions: true,
    json: true,
    maxsize: process.env.MAX_SIZE_FILES, // 5MB
    maxFiles: process.env.MAX_FILES, // 8 files
    colorize: true,
  },
};

// instantiate a new Winston Logger by calling createLogger constructor
const logger = new winston.createLogger({
  transports: [
    new (winston.transports.File)(format.errorFile),
    new (winston.transports.File)(format.infoFile),
    new (winston.transports.Console)(format.infoLogs),
  ],
  exitOnError: false, // do not exit on handled exceptions
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write(message, encoding) {
    logger.info(message);
  },
};

module.exports = logger;
