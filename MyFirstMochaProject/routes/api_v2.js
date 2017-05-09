/**
 * Created by Felix on 3-5-2017.
 */

// API version 2
var express = require('express');
var router = express.Router();

router.get('/info', function(req, res) {
    res.status(200);
    res.json({"description": "Welcome to the info page. Unfortunately there is no info though."})
});

router.get('*', function(request, response) {
    response.status(404);
    response.json({
        "description": "404 - Page not found. So sorry."
    });
});

module.exports = router;