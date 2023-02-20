const express = require("express");
const app = express();
const port = 3000;
//public folder
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile("index.html");
});
app.get("/commencer", (req, res) => {
  res.sendFile("commencer.html", { root: __dirname });
});
app.get("/guide", (req, res) => {
  res.sendFile("guide.html", { root: __dirname });
});
app.get("/statique/:dos/:file", (req, res) => {
  let dos = req.params.dos;
  let file = req.params.file;
  res.sendFile(`/public/statique/${dos}/${file}`, { root: __dirname });
});
app.get("/css/:file", (req, res) => {
  let file = req.params.file;
  res.sendFile(`/public/css/${file}`, { root: __dirname });
});
app.get("/js/:file", (req, res) => {
  let file = req.params.file;
  res.sendFile(`/public/js/${file}`, { root: __dirname });
});
app.get("/test", (req, res) => {
  res.send("test");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
