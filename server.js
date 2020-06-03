var path = require('path');
var express = require('express');
var app = express();

app.use(express.static('dist/ang-waterflow-sensor'));

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '/dist/ang-waterflow-sensor/index.html'));
});

app.listen(process.env.PORT || 8080);