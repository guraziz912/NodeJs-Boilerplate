const dotenv = require('dotenv');

dotenv.config();
const express = require('express');
const Sentry = require('@sentry/node');
const Tracing = require('@sentry/tracing');

const app = express();
const morgan = require('morgan');
const multer = require('multer');
const logger = require('./logger/logger');
const User = require('./models/users');
const userRoutes = require('./routes/authenticationRoutes');
const constants = require('./utils/constants');
const { fileFilter, fileStorage } = require('./utils/imageUploader');
const headers = require('./middlewares/headers');

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app }),
  ],
  tracesSampleRate: constants.tracesSampleRate,
});

app.use(express.json());

app.use(multer({ storage: fileStorage, fileFilter }).single('file'));
app.use(morgan('combined', { stream: logger.stream }));
app.use(headers);
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
app.use('/user', userRoutes);
// Sentry error handler
app.use(Sentry.Handlers.errorHandler());
// Exception handler
process.on('uncaughtException', (err) => {
  logger.error(err);
});
// Common Error Handler
app.use((error, req, res, next) => {
  logger.error(error);
  const status = error.statusCode || constants.genericErrorStatusCode;
  res.status(status).json({
    success: false,
    message: error.message,
  });
});

User.sequelize
  .sync()
  .then(() => {
    app.listen(process.env.PORT);
  })
  .catch((error) => {
    logger.error(error);
  });
