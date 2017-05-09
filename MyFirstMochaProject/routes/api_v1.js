/**
 * Created by Felix on 3-5-2017.
 */

// API version 1
var express = require('express');
var router = express.Router();

router.get('*', function(request, response) {
    response.status(200);
    response.json({
        "description": "Recipes REST server API version 1 is no longer supported. " +
        "Please use API version 2."
    });
});
module.exports = router;