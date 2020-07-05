var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
var session = require('express-session');
var flash = require('connect-flash');
var { defineRequestErrors } = require('./tools/validation');

var indexRouter = require('./routes/index');
var dialogsRouter = require('./routes/dialogs');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// flash uses session and the session uses cookies
app.use(cookieParser('this is cookie secret key'));
app.use(session({ 
    secret: 'this is session secret key',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
}));
app.use(flash());

// transforms sass/scss into css at runtime
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));

// make "public" folder public for static assets,
// and besides these assets are got witout public folder 
// e.g. /style.css and not /public/style.css
app.use(express.static(path.join(__dirname, 'public')));

app.use(defineRequestErrors);

// app module routes
app.use('/', indexRouter);
app.use('/dialogs', dialogsRouter);

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
