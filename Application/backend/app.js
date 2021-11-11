var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
var config = require('./configure');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const passport = require('passport');
const authentiate = require('./authenticating');
const profile = require('./routes/profile');
const cors = require('cors');


// Connect to MongoDB
mongoose
  .connect(
    'mongodb://mongodb:27017/profile',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
.catch((err)=>  console.log(err));

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize())


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/profile',authentiate.verify,profile);

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
