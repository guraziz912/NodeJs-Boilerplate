const { Logger } = require('winston');
const { SQLTransport } = require('../lib/winston-sql-transport');

const errorLogger = new Logger({
  transports: [
    new SQLTransport({
      tableName: 'errorLogs',
    })],
});

module.exports = errorLogger;
