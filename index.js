var express = require("express");
var app = express();
var mongoose = require("mongoose");
var parser = require("body-parser");
var score = require("./score");
var fs = require("fs")
var Taking = require("./db/connection")



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

app.get("/admin", function(req,res){
  var quizzes = fs.readdirSync(__dirname + "/public/quizzes")
  quizzes = quizzes.map( quiz => {
    return quiz.replace(".js", "")
  })
  res.render("admin", {quizzes})
});

app.get("/raw/:id", function(req, res){
  Taking.find({_id:req.params.id}, function(err, takings){
     res.json(takings);
  })
})

app.get("/admin/:quiz", function (req, res) {
  var quizNo = req.params.quiz
  Taking.summary(quizNo, function (takings) {
    res.render("admin", {takings})
  })
})

app.get("/:id/:taking/thanks", function(req, res){
  Taking.findOne({_id: req.params.taking}, (_,doc) => {
    res.render("thanks",doc.summary())
  })
})

app.get("/:id", function (req, res) {
  var quizNo = req.params.id
  res.render("quiz", { quiz: quizNo })
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

app.post("/checkpoints/:id/:taking/submit", function(req, res){
  Taking.findOneAndUpdate({_id: req.params.taking}, {completedAt: Date.now()}, {new: true}).then(function(taking){
    res.redirect(`/${req.params.id}/${req.params.taking}/thanks`);
  })
})

app.listen(3000);
