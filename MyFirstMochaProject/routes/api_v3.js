/**
 * Created by jesse on 10/05/17.
 */

// API version 3
var express = require('express');
var router = express.Router();
var pool = require('../db/db_connector');


// router.get('/cities', function (req, res) {
//     var query_str;
//     if (citi) {
//         query_str = 'SELECT * FROM actor_info WHERE last_name = "' +lastname+'";';
//     } else {
//         query_str = "SELECT * FROM actor_info";
//     }

// pool.getConnection(function (err, connection) {
//     connection.query(query_str, function (err, rows, fields) {
//         connection.release();
//         if (err) {
//             throw err
//         }
//         res.status(200).json(rows);
//     });
// });

//select countries, filtered on continent an set an optional limit to amount of countries shown.
router.get('/countries/search', function(req, res) {

    var continent = req.query.continent || '';
    var limit = req.query.limit || '';
    var query = '';
    console.log(continent + ' / ' + limit + '----------------');

    if (continent && limit) {
        query = "SELECT * FROM country where continent = '" + continent + "' LIMIT " + limit + ";";
        console.log(query);
    } else if (continent) {
        query = "SELECT * FROM country where continent = '" + continent + "';";
        console.log(query);
    } else if (limit) {
        query = "SELECT * FROM country LIMIT + '" + limit + "';";
        console.log(query);
    }

    if (query !== '') {
        pool.getConnection(function (err, connection) {
            connection.query(query, function (err, rows) {
                connection.release();
                if (err) {
                    throw err;
                }
                res.status(200).json(rows);
            })
        })
    } else {
        console.log('Search query is empty.');
        res.send('Search query is empty. Example query: /api/v3/countries/search?continent=Europe&limit=10 .');
    }
});


//select all countries or one country by name
router.get('/countries/:name?', function (req, res) {

    var countryName = req.params.name || '';
    var query = '';

    if (countryName) {
        query = 'SELECT * FROM country WHERE name = "' + countryName + '";'
    } else {
        query = 'SELECT * FROM country';
    }

    pool.getConnection(function (err, connection) {
        connection.query(query, function (err, rows, fields) {
            connection.release();
            if (err) {
                throw err
            }
            res.status(200).json(rows);
        });
    });
});

//add country
router.post('/countries/new/:code', function (req, res) {

    var landCode = req.params.code;

    var query = 'INSERT INTO country VALUES("' + landCode + '", "Gekkelandje", "Gekke continentje",' +
        '"Gekke regiotje", "Surface areatje", 2016, 9001, 105.2, 0.00, 0.00,' +
        ' "Lokale naam", "Reepoeblique", "Felix Boons", 130, "XX")';

    pool.getConnection(function (err, connection) {
        connection.query(query, function (err, rows, fields) {
            connection.release();
            if (err) {
                throw err;
            }
            console.log('New country created with primary key ' + landCode);
            res.status(200).json(rows);
        })
    });
});

//update country
//WERKT NOG NIET. RUNT WEL ZONDER ERRORS, MAAR UPDATE NOG GEEN DATA.
router.post('/countries/update/:code/:name', function (req, res) {

    var landCode = req.params.code;
    var name = req.params.name;

    var query = 'UPDATE country SET name = "' + name + '" WHERE country.code = "' + landCode + '";';

    pool.getConnection(function (err, connection) {
        connection.query(query, function (err, rows, fields) {
            if (err) {
                throw err;
            }
            res.status(200).json(rows);
            if (rows.rowsAffected === 0) {
                console.log("No rows were affected!");
            } else {
                console.log('Country with code ' + landCode + ' has been updated to name "' + name + '".');
            }
        });
    });
});

//delete country
//WERKT NOG NIET. RUNT WEL ZONDER ERRORS, MAAR DELETE NOG GEEN DATA.
router.delete('/countries/delete/:code', function (req, res) {

    var code = req.params.code;

    var query = 'DELETE FROM `country` WHERE `country`.`code` = "' + code + '";';

    pool.getConnection(function (err, connection) {
        connection.query(query, function (err, rows, fields) {
            if (err.ER_ROW_IS_REFERENCED) {
                res.send('Foreign key constraint. Cannot delete this row');
            }
            if (err) {
                throw err;
            }
            res.status(200).json(rows);
            if (rows.affectedRows === 0) {
                console.log('No rows were affected!');
            } else {
                console.log('Country with code ' + code + ' has been deleted from the database.');
            }
        });
    });
});

router.get('*', function (request, response) {
    response.status(404);
    response.json({
        "description": "404 - Page not found. So sorry."
    });
});

module.exports = router;