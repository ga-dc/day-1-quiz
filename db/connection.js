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
         score: score(taking.solutions),
	 _id: t._id
       }
     })
     cb(customTakings)
   })
}

TakingSchema.methods.summary = function(){
   var taking = this.toObject();
   return {
     name: taking.name,
     duration: (taking.completedAt - taking.createdAt)/ 1000,
     score: score(taking.solutions)
   }
}

var Taking = mongoose.model("Taking", TakingSchema);

module.exports = Taking;
