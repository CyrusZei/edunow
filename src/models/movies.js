var mongoose = require('mongoose');

var restful = require('node-restful');
var mongoose = restful.mongoose;

var movieSchema = new mongoose.Schema({
  name: String,
  author: String,
  rating: Number,
  watched: Boolean
});

var movies =  restful.model('movies', movieSchema)
  .methods(['get', 'post', 'put', 'delete']);



module.exports = movies;
