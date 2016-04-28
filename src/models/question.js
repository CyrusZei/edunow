var mongoose = require('mongoose');

var restful = require('node-restful');
var mongoose = restful.mongoose;

var questionSchema = new mongoose.Schema({
  question_headline: String,
  author_user: String,
  question_msg: String,
  tags: String,
  comments: [{
    name: String,
    vote: Number,
    msg: String
      }]
});

var questions =  restful.model('questions', questionSchema)
  .methods(['get', 'post', 'put', 'delete']);



module.exports = questions;
