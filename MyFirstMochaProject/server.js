/**
 * Created by Felix on 3-5-2017.
 */

var express = require('express');
var http = require('http');

var config = require('./config.json');

var app = express();

app.all('*', function(req, res, next){
    console.log(req.method + " " + req.url);
    next();
});

app.set('PORT', config.webPort);
var port = process.env.PORT || app.get('PORT');

app.get('*', function(req, res) {
    res.contentType('application/json');
    res.json({"werkt het?":"true"});
});

app.listen(port, function() {
    console.log("Deze magic happens op port " + port + ".");
});