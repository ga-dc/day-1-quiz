var express = require("express");
var app = express();
var mongoose = require("mongoose");
var parser = require("body-parser");
var score = require("./score");
var fs = require("fs")
mongoose.connect("mongodb://localhost/day-one-quiz");
var TakingSchema = new mongoose.Schema({}, {strict: false});
TakingSchema.statics.summary = function(cb){
  return Taking.find({}, function(err, takings){
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

app.use(express.static("public"));
app.use(parser.urlencoded( { extended: true } ));
app.set("view engine", "hbs");

app.get("/", function(req,res){
  var quizzes = fs.readdirSync(__dirname + "/public/quizzes")
  quizzes = quizzes.map( quiz => {
    return quiz.replace(".js", "")
  })
  res.render("index", {quizzes: quizzes})
});

app.get("/:id", function (req, res) {
  var quizNo = req.params.id
  res.render("quiz", { quiz: quizNo })
})

app.get("/admin", function(req,res){
  Taking.summary(function(takings){
    res.render("admin", {takings: takings})
  })
});

app.get("/admin.json", function(req, res){
  Taking.summary(function(takings){
     res.json(takings);
  })
})

app.get("/raw.json", function(req, res){
  Taking.find({}, function(err, takings){
     res.json(takings);
  })
})

app.get("/thanks", function(req, res){
  res.sendFile(__dirname + "/public/thanks.html");
})

app.get("/checkpoints/:id/:taking", function(req, res){
    var quizNo = req.params.id
    var taking = req.params.taking
    res.render("quiz", {quiz: quizNo, taking })
})


app.post("/checkpoints/:id/submissions", function(req, res){
  Taking.create({name: req.body.name, createdAt: Date.now(), solutions: [], quizNo: req.params.id }).then(function(taking){
    console.log(taking.solutions);
    res.redirect("/checkpoints/" + req.params.id + "/" + taking._id + "#0");
  })
})

app.post("/checkpoints/:id/:taking/checkings", function(req, res){
  Taking.findOneAndUpdate({_id: req.params.taking}, {$push: {solutions: req.body}}, {new: true}).then(function(taking){
    res.send(taking);
  })
})

app.post("/checkpoints/:id/submit", function(req, res){
  Taking.findOneAndUpdate({_id: req.params.id}, {completedAt: Date.now()}, {new: true}).then(function(taking){
    res.redirect("/thanks");
  })
})

app.listen(3000);
