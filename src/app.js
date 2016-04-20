var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var restful = require('node-restful');
var mongoose = restful.mongoose;
var movies = require('./models/movies');
var app = express();


app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(methodOverride());

require('./database');
var Resource = app.resource = movies;

Resource.register(app, '/api');


app.listen(3000, function(){
  console.log("Server is online, port 3000");
});
