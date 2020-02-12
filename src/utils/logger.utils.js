const { format, loggers, transports } = require('winston');

loggers.add('app-logger', {
  format: format.combine(
    format.simple(),
    format.timestamp(),
    format.printf((log) => `${log.timestamp} | ${log.level} | ${log.message}`),
  ),
  transports: [
    new transports.Console({
      level: 'debug',
    }),
  ],
});

module.exports = loggers;
