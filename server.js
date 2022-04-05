//Empty JS object to act as endpoint for all routes
projectData = {};
// Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
// Dependencies
const bodyParser = require("body-parser");
//Here we are configuring express to use body-parser as middle-ware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
//Initializing the main project folder
app.use(express.static("website"));
const port = 5000;
// Spin up the server
const server = app.listen(port, listening);
function listening() {
  console.log(`server is running on localhost: ${port}`);
}
//post route uses the url and callback function
app.post("/add", callBack);
function callBack(req, res) {
  projectData = {
    cityName: req.body.city,
    currentDate: req.body.date,
    currentTemp: req.body.temperature,
    currentFelling: req.body.content,
  };
  res.send(projectData);
}
//get route uses the url and callback function
app.get("/all", sendData);
function sendData(req, res) {
  res.send(projectData);
}
