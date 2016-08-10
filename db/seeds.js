var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/quiz");

var TakingSchema = new mongoose.Schema({}, {strict: false});
var Taking = mongoose.model("Taking", TakingSchema);

Taking.create({name: "Test"}, function(err, taking){
  console.log(taking);
})
