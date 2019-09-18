var express = require("express");
var app = express();
var formidable = require("express-formidable");
var fs = require("fs");

app.use(express.static("public"));

app.use(formidable());

app.post("/create-post", function(req, res) {
  fs.readFile(__dirname + "/data/posts.json", function(error, file) {
    var parsedFile = JSON.parse(file);
    parsedFile[Date.now()] = req.fields.blogpost;
    var data = JSON.stringify(parsedFile);
    fs.writeFile(__dirname + "/data/posts.json", data, function(error) {
      if (error) {
        console.log(error);
      }
    });
  });
});

app.get("/get-posts", function(req, res) {
  res.sendFile(__dirname + "/data/posts.json");
});

app.listen(3000, function() {
  console.log("Server listening on 3000.");
});
