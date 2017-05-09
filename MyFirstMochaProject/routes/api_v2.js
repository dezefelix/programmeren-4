/**
 * Created by Felix on 3-5-2017.
 */

// API version 2
var express = require('express');
var router = express.Router();

var recipes = require('../recipes');

router.get('/info', function (req, res) {
    res.status(200);
    res.json({"description": "Server om NodeJS te oefenen (programmeren 4)"});
});

router.get('/recipes', function (req, res) {
    res.status(200);

    var category = req.query.category || '';

    if (category !== '') {
        var recipe = recipes.filter(function (r) {
            return (r.category.toLowerCase() === category.toLowerCase());
        });
    } else {
        recipe = recipes;
    }

    res.json(recipe);
});

// router.get('/recipes', function(req, res) {
//     res.status(200);
//
//     var ingredient = req.query.ingredient || '';
//
//     var recipe = recipes.filter(function(r) {
//         return (r.ingredient.toLowerCase() === ingredient.toLowerCase());
//     });
//
//     res.json(recipe);
// });

router.get('/recipes', function (req, res) {
    res.status(200);
    res.json(recipes);

});

router.get('/recipes/:number', function (req, res) {
    res.status(200);

    var number = req.params.number || '';
    var recipe = recipes[number - 1];

    res.json(recipe);
});

router.get('*', function (request, response) {
    response.status(404);
    response.json({
        "description": "404 - Page not found. So sorry."
    });
});

module.exports = router;