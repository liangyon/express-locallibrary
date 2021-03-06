var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var session = require('express-session')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var coolRouter = require('./routes/cool');
var catalogRouter = require('./routes/catalog');  //Import routes for "catalog" area of site

var compression = require('compression');
var helmet = require('helmet');

var app = express();
app.use(helmet());
app.use(compression()); //Compress all routes

app.use(express.static(path.join(__dirname, 'public')));

// mongoose setup
try {
  var secret = require('./secrets.js');
  var dev_db_url = secret.secrets;
} catch (error) {
  var dev_db_url = "";
}


var mongoose = require('mongoose');

var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'keyboard catastrophe',
  resave: true,
  saveUninitialized: true
}));

require('./middleware/passport')(passport);
app.use(passport.initialize());
app.use(passport.session())
app.get('*', function(req, res, next){
  res.locals.user = req.user|| null;
  next();
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/cool', coolRouter);
app.use('/catalog', catalogRouter);  // Add catalog routes to middleware chain.




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
