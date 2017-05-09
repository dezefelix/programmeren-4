/**
 * Created by Felix on 3-5-2017.
 */

//core modules
var express = require('express');
var http = require('http');

//modules
var config = require('./config.json');

//create app
var app = express();

//set PORT
app.set('PORT', config.webPort);
var port = process.env.PORT || app.get('PORT');


app.all('*', function(req, res, next){
    console.log(req.method + " " + req.url);
    next();
});

app.get('/index', function(req, res) {
    res.contentType('application/json');
    res.json({"werkt het?": "true"});
});

//routes
app.use('/api/v1', require('./routes/api_v1'));
app.use('/api/v2', require('./routes/api_v2'));


//start server
app.listen(port, function() {
    console.log("De magie gebeurt op port " + port + ".");
});

//export module
module.exports = app;