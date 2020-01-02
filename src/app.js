const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');

const AccountService = require('./services/employeeAccount.service');
// load configuration data from the .env file
require('dotenv').config({
  path: path.join(__dirname, 'src/.env'),
});

const db =require('./db');
// Todo: Put passport config in config

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
//const bcrypt = require('bcrypt');

passport.serializeUser(function(user, done) {
  done(null, user.account.email);
});

passport.deserializeUser(async function(email, done) {
  const accountService = new AccountService(db);
  const user = await accountService.getRecordAccountByEmail(email);
  const {roles, perms} = await accountService.getPermissions(user.record.id, user.record.jobTitle);
          user.roles = roles;
          user.perms = perms;
        
  done(null, user);
});

passport.use(
  new LocalStrategy(function(email, password, done) {
  const accountService = new AccountService(db);
  accountService.getRecordAccountByEmail(email).then((object)=>{
    if (object.account) {
      bcrypt.compare(password, object.account.password, async (err, correct) => {
        if (err) {
          message = [{'msg': 'Incorrect Password/Email'}];

          return done(null, false, {message});
        }
        if (correct) {
          
          return done(null, object);
        }
      });
    } else {
      message = [{'msg': 'Incorrect Password/Email'}];
      return done(null, false, {message});
    }

}); }));


// Routes for the "api" endpoints
// Todo: Bundle these routes to a single file
const frontendRouter = require('./routes/frontend');
const indexRouter = require('./routes/index');
const recordRouter = require('./routes/record');
const accountRouter = require('./routes/account');
const jobRouter = require('./routes/job');
const payGradeRouter = require('./routes/paygrade');
const leaveRouter = require('./routes/leave');
const departmentRouter = require('./routes/department');
const empTypeRouter = require('./routes/empType');
const organizationRouter =require('./routes/organization');
const bcrypt = require('bcrypt');
const roleAndPermission=require('./routes/roleAndPermission');


// Routes for the frontend

const app = express();


app.use(express.static(
    path.normalize(
        path.join(__dirname, '../web/public'),
    ),
));

app.use(cookieParser());
app.use(flash());
app.use(session({secret: 'secret'}));

app.use(passport.initialize());
app.use(passport.session());


// view engine setup
const expressLayouts = require('express-ejs-layouts');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

// Don't use a layout by default
app.set('layout', false);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use((req, res, next)=> {
  res.locals.error = req.flash('error');
  next();
});

app.use((req, res,next)=>{

 //console.log(req.locals)
  next();
})

app.use('/', indexRouter);
app.use('/', frontendRouter);

app.use('/record', recordRouter);
app.use('/account', accountRouter);
app.use('/job', jobRouter);
app.use('/paygrade', payGradeRouter);
app.use('/absence', leaveRouter);
app.use('/department', departmentRouter);
app.use('/empType', empTypeRouter);
app.use('/organization', organizationRouter);
app.use('/roleAndPermission',roleAndPermission);



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
