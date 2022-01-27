var express = require('express');
var app = express();
var bodyParser = require('body-parser');
require('dotenv').config();

// Build static path to CSS file using a middleware function
var pubPath = __dirname + '/public';
app.use("/public", express.static(pubPath));

// Build a root level middleware logger
app.use(function (req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

// Use a body parser to collect POST data
var urlencodedParser = bodyParser.urlencoded({extended: false});
app.use(urlencodedParser);

// Build a time request function by chaining two middleware functions
app.get("/now", function (req, res, next) {
  req.time = new Date().toString();
  next();
}, function(req, res, next) {
  res.send({time: req.time})
});

// Build an echo server mounted at "Get /:word/echo"
app.get("/:word/echo", function (req, res) {
  res.send({echo: req.params.word})
});

// Build an API end point for '/name'
app.get("/name", function(req, res) {
  var {first: firstname, last: lastname} = req.query;
  res.json({name: `${firstname} ${lastname}`});
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

// Create a POST collector for the /name route
app.post('/name', urlencodedPArser, ); 

console.log("Hello World");

// Export the app module for use in other JS files
module.exports = app;
