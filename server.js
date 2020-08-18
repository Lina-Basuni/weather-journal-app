// Setup empty JS object to act as endpoint for all routes
let projectData = [];


// Require Express to run server and routes
var bodyParser = require('body-parser');
var express = require('express');
var cors = require('cors');


// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;
const server = app.listen(port, ()=>{console.log(`running on localhost: ${port}`)})


app.get('/all', function (req, res) {
  res.send(projectData);
  console.log(req);
  console.log("GET: "+projectData);
});



// POST method route
app.post('/addEntry', function (req, res) {
  res.send('POST received')
  console.log(req.body)
  projectData.push(req.body)
  console.log("PUSH: "+projectData);
});
