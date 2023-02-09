const express = require("express");
const port = process.env.PORT || 88;

//create express app
const app = express();
const path = __dirname + "/views/";

app.use(express.static(path));
const server = app.listen(port, function () {
  console.log("Listening on port " + port);
});

app.get("/", function (req, res) {
  //go to index.html
  res.sendFile(path + "index.html");
});

app.get("/debuter", function (req, res) {
  res.sendFile(path + "/commencer/index.html");
});

app.get("/le-guide-du-street-workout", function (req, res) {
  res.sendFile(path + "/guide/index.html");
});

//if the user goes to a page that doesn't exist
app.use(function (req, res) {
  res.sendFile(path + "index.html");
});
