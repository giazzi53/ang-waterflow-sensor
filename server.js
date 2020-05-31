//Install express server
var path = require('path');
var express = require('express');
var cors = require('cors');
var app = express();

// Serve only the static files form the dist directory
app.use(express.static('dist/ang-waterflow-sensor'));
app.use(cors());

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '/dist/ang-waterflow-sensor/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);

// const express = require('express');
// const app = express();
// const path = require('path');

// app.use(express.static(__dirname + '/dist/ang-waterflow-sensor'));
// app.listen(process.env.PORT || 8080);
// app.get('/*', function(req, res) {
//     res.sendFile(path.join(__dirname + '/dist/ang-waterflow-sensor/index.html'));
// })