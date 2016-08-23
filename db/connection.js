var mongoose = require("mongoose");
var score = require("../score") 
mongoose.connect("mongodb://localhost/quiz");

var TakingSchema = new mongoose.Schema({}, {strict: false});
TakingSchema.statics.summary = function(quizNo, cb){
  return Taking.find({quizNo}, function(err, takings){
     customTakings = takings.map(function(t){
       var taking = t.toObject();
       return {
         name: taking.name,
         duration: (taking.completedAt - taking.createdAt)/ 1000,
         score: score(taking.solutions)
       }
     })
     cb(customTakings)
   })
}

var Taking = mongoose.model("Taking", TakingSchema);

module.exports = Taking;
