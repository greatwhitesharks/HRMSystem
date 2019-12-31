const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');

// load configuration data from the .env file
require('dotenv').config({
  path: path.join(__dirname, 'src/.env'),
});

// Routes for the "api" endpoints
// Todo: Bundle these routes to a single file
const indexRouter = require('./routes/index');
const recordRouter = require('./routes/record');
const accountRouter = require('./routes/account');
const jobRouter = require('./routes/job');
const leaveRouter = require('./routes/leave');
const empTypeRouter = require('./routes/empType');

// Routes for the frontend
//const frontendRouter = require('./routes/frontend');

const app = express();

// view engine setup
//const expressLayouts = require('express-ejs-layouts');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(expressLayouts);

// Don't use a layout by default
app.set('layout', false);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(express.static(
    path.normalize(
        path.join(__dirname, '../web/public'),
    ),
));


app.use('/', indexRouter);
//app.use('/', frontendRouter);

app.use('/record', recordRouter);
app.use('/account', accountRouter);
app.use('/addjob', jobRouter);
app.use('/removejob', jobRouter);
app.use('/absence', leaveRouter);
app.use('/addEmpType', empTypeRouter);
app.use('/removeEmpType', empTypeRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
