var express = require("express");
var app = express();
var mongoose = require("mongoose");
var parser = require("body-parser");

mongoose.connect("mongodb://localhost/quiz");
var TakingSchema = new mongoose.Schema({}, {strict: false});
var Taking = mongoose.model("Taking", TakingSchema);

app.use(express.static("public"));
app.use(parser.urlencoded());

app.get("/", function(req,res){
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/:id", function(req, res){
  res.sendFile(__dirname + "/public/index.html");
})

app.post("/submissions", function(req, res){
  Taking.create({name: req.body.name, createdAt: Date.now(), solutions: []}).then(function(taking){
    console.log(taking.solutions);
    res.redirect("/" + taking._id + "#0");
  })
})

app.post("/:id/checkings", function(req, res){
  Taking.findOneAndUpdate({_id: req.params.id}, {$push: {solutions: req.body}}, {new: true}).then(function(taking){
    res.send(taking);
  })
})

app.listen(3000);
