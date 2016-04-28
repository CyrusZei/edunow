var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/questions', function(err){
  if (err) {
    console.log("Failed to connect to mongodb");
  } else {
    console.log("connected to mongodb");
  }
});
