var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var restful = require('node-restful');
var mongoose = restful.mongoose;
var questions = require('./models/question');
var path    = require("path");
var app = express();


app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

app.use(methodOverride());
app.use('/', express.static('../public'));



require('./database');
var Resource = app.resource = questions;

Resource.register(app, '/api');





app.listen(3000, function(){
  console.log("Server is online, goto : localhost:3000/#/");
});
