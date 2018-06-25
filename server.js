const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
    res.sendFile('index');
});

app.listen(3000, function() {
    console.log('Listening on port 3000');
});