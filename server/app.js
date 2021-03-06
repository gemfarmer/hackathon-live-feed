// *** main dependencies *** //
var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    flash = require('connect-flash'),
    mongoose = require('mongoose'),
    swig = require('swig'),
    passport = require('passport'),
    keepHerokuAlive = require('./utils');


// *** config file *** //
var config = require('./_config');


// *** seed the database *** //
if (process.env.NODE_ENV === 'development') {
  var seedAdmin = require('./models/seeds/admin.js');
  seedAdmin();
}


// *** routes *** //
var mainRoutes = require('./routes/index');
var userRoutes = require('./routes/users');
var gitRoutes = require('./routes/git');
var twitterRoutes = require('./routes/twitter');


// *** express instance *** //
var app = express();


// *** view engine *** ///
swig = new swig.Swig();
app.engine('html', swig.renderFile);
app.set('view engine', 'html');


// *** static directory *** ///
app.set('views', path.join(__dirname, './views'));


// *** middeleware *** //
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: config.secretKey,
  resave: false,
  saveUninitialized: true
}));
app.use(flash());
app.use(function(req, res, next){
  res.locals.success = req.flash('success');
  res.locals.errors = req.flash('error');
  next();
});
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, '../client', 'public')));


// *** mongo *** //
app.set('dbUrl', config.mongoURI[app.settings.env]);
mongoose.connect(app.get('dbUrl'));


// *** main routes *** //
app.use('/', mainRoutes);
app.use('/auth', userRoutes);
app.use('/git', gitRoutes);
app.use('/twitter', twitterRoutes);


// ** heroku ping ** //
keepHerokuAlive();


// *** error handlers *** //

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
