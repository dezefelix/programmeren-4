/**
 * Created by Felix on 9-5-2017.
 */

//core modules
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');
var should = chai.should();

chai.use(chaiHttp);

describe('API test recipes', function () {
    it('Test GET /api/v2/recipes', function (done) {
        chai.request(server)
            .get('/api/v2/recipes')
            .end(function (err, res) {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });
});

describe('API test single recipe', function () {
    it('Test GET /api/v2/recipes/2', function (done) {
        chai.request(server)
            .get('/api/v2/recipes/2')
            .end(function (err, res) {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });
});

describe('API Test info', function () {
    it('Test GET /api/v2/info', function (done) {
        chai.request(server)
            .get('/api/v2/info')
            .end(function (err, res) {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });
});

describe('API Test error', function () {
    it('Test GET /api/v2/randompage', function (done) {
        chai.request(server)
            .get('/api/v2/info')
            .end(function (err, res) {
                res.should.have.status(404);
                res.body.should.be.a('object');
                done();
            });
    });
});