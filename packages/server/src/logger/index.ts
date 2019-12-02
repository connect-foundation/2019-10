import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';
import winston = require('winston');

const { combine, timestamp, label, printf, colorize } = format;

// tslint:disable-next-line: no-shadowed-variable
const myFileFormat = printf(({ level, message, label, timestamp }) => {
  return `[${label}] ${timestamp}> ${level}: ${message}`;
});

// tslint:disable-next-line: no-shadowed-variable
const myConsoleFormat = printf(({ level, message, label, timestamp }) => {
  return `\x1b[35;1m[${label}] \x1b[30;1m${timestamp}\x1b[0m> ${level}: ${message}`;
});

// highest to lowest
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  verbose: 3,
  debug: 4,
  silly: 5,
};

const fileTransport = new transports.DailyRotateFile({
  level: 'info',
  filename: `logs/info-%DATE%.log`,
  datePattern: 'YYYY-MM-DD-HH',
  handleExceptions: true,
  format: combine(label({ label: 'Wedev' }), timestamp(), myFileFormat),
  maxSize: '20m',
  maxFiles: '30d',
});

const consoleTranportOption = {
  level: 'silly',
  handleExceptions: true,
  format: combine(
    colorize({ all: true }),
    label({ label: 'Wedev' }),
    timestamp(),
    myConsoleFormat,
  ),
};

function makeTransports() {
  const myTransports = [];

  myTransports.push(fileTransport);

  if (process.env.NODE_ENV !== 'production') {
    myTransports.push(new transports.Console(consoleTranportOption));
  }

  return myTransports;
}

export const logger = createLogger({
  levels,
  transports: makeTransports(),
  exitOnError: false,
});

// // Example
// logger.error('error');
// logger.warn('warn');
// logger.info('info');
// logger.verbose('verbose');
// logger.debug('debug');
// logger.silly('silly');
