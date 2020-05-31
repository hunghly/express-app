const express = require('express');
const path = require('path'); // tool used to set file path
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // uses the public directory '
app.use(bodyParser.urlencoded());


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

module.exports = app;
