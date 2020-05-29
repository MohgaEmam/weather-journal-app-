// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
const server = app.listen(port, () => {console.log(`Server is running on local host: ${port}`)});
console.log(server);

//post route 
app.post('/weather', (req,res) => {
    projectData = {
        temp: req.body.temp,
        date: req.body.date,
        feel: req.body.feel
    }
    res.send(projectData);
});

//Get route
app.get('/all', (req, res) => {
    res.send(projectData);
});
