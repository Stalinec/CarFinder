'use strict';

var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var express = require('express');
var expressHbs = require('express-handlebars');
require('dotenv').load();

var index = require('./routes/index');
var models = require('./models');
const loadFixtures = require('./db_scripts/insertFixtures');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');

app.set('port', process.env.PORT || 5000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

models.sequelize.sync()
  .then(loadFixtures());

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
