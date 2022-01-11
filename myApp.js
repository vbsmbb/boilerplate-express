var express = require('express');
var app = express();
require('dotenv').config();

// Build static path to CSS file using a middleware function
var pubPath = __dirname + '/public';
app.use("/public", express.static(pubPath));

// Build a root level middleware logger
app.use(function (req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

// Display the root page which comes from the INDEX.HTML file
var vwPath = __dirname + '/views/index.html';
app.get('/', (req,res) => {
  res.sendFile(vwPath)
});

// Create a JSON message and control capitalization with environment variable 
// and display on the /json route
var msg;
app.get('/json', (req, res) => {
  if (process.env.MESSAGE_STYLE === 'uppercase') {
    msg = {"message": "HELLO JSON"}
  } else {
    msg = {"message": "Hello json"}
  }
  res.json(msg)
});

console.log("Hello World");

// Export the app module for use in other JS files
module.exports = app;
