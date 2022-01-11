var express = require('express');
var app = express();
require('dotenv').config();

var pubPath = __dirname + '/public';
app.use("/public", express.static(pubPath));

var vwPath = __dirname + '/views/index.html';
app.get('/', (req,res) => {
  res.sendFile(vwPath)
});

console.log("msg:", msg);
app.get('/json', (req, res) => {
  var msg;
  if (process.env.MESSAGE_STYLE === 'uppercase') {
    msg = {"message": "HELLO JSON"}
  } else {
    msg = {"message": "Hello json"}
  }
  res.json(msg)
});

  
console.log("Hello World");

module.exports = app;
