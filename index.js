var express = require("express");
var app = express();
var mongoose = require("mongoose");
var parser = require("body-parser");

app.get("/", function(req,res){
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(3000);
