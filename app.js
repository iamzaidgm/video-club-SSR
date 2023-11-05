const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const { expressjwt } = require('express-jwt');

const JwtKey = "ebc68964cfb0bba955af97edbba18468";

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const directorsRouter = require('./routes/directors');
const moviesRouter = require('./routes/movies');
const actorsRouter = require('./routes/actors');
const genresRouter = require('./routes/genres');
const membersRouter = require('./routes/members');
const copiesRouter = require('./routes/copies');
const awaitListsRouter = require('./routes/AwaitLists');
const bookingRouter = require('./routes/bookings');

var app = express();
//  mongodb://<dbUser>?:<dbPass>?@<url>:zport>/<dbName>
const url = "mongodb://localhost:27017/video-club";
mongoose.connect(url);

const db = mongoose.connection;

// Se conecta
db.on('open', () => {
  console.log("Connection OK");
});

// No se conecta
db.on('error', () => {
  console.log("Connection Failed");
})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(expressjwt({secret:JwtKey, algorithms:['HS256']})
  .unless({path:["/login/"]}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/directors', directorsRouter);
app.use('/movies', moviesRouter);
app.use('/actors', actorsRouter);
app.use('/genres', genresRouter);
app.use('/members', membersRouter);
app.use('/copies', copiesRouter);
app.use('/awaitLists', awaitListsRouter);
app.use('/bookings', bookingRouter);

// catch 404 
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
