var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');

var io = require('socket.io');

//Connect to mongo DB
var config = require('./config');
mongoose.connect(config.database);

//Express plugin
var app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//Routes
var index = require('./server/routes/index');
var login = require('./server/routes/login');
var authen = require('./server/routes/authen');
var ui = require('./server/routes/ui');
var api = require('./server/routes/api');
//Middlewares
app.use('/', index);
app.use('/login', login);
app.use('/authen', authen);
app.use('/ui', ui);
app.use('/api', api);
//Static
app.use(express.static(path.join(__dirname, 'public')));
//Run Server
var server = io.listen(app.listen(config.port || 3000));
console.log("Server is running on port: "+(config.port || 3000));

