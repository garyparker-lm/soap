const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const claim = require('./routes/claim');

const app = express();

// Middleware
app.use(logger('dev'));
app.use(bodyParser.text({type: 'application/xml'}));
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use('/api/v1/claim', claim);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  console.log(err);
  res.send(err);
});

module.exports = app;
