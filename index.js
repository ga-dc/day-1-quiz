var express = require("express");
var app = express();
var mongoose = require("mongoose");
var parser = require("body-parser");
var score = require("./score");

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
app.use(parser.urlencoded());
app.set("view engine", "hbs");

app.get("/", function(req,res){
  res.sendFile(__dirname + "/public/index.html");
});

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

app.post("/:id/submit", function(req, res){
  Taking.findOneAndUpdate({_id: req.params.id}, {completedAt: Date.now()}, {new: true}).then(function(taking){
    res.redirect("/thanks");
  })
})

app.listen(3000);
