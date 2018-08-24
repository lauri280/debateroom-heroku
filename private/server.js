const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');

app.set('port', (process.env.PORT || 4000));

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
    res.sendFile('debateroom');
});

app.get('/countdown', function(req, res) {
    res.sendFile('countdown.html', { root: __dirname });
});


app.listen(app.get('port'), function() {
    console.log('Listening on port ' + app.get('port'));
});