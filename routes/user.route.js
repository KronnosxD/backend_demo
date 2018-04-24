var express = require('express');
var UserController = require('../controller/user.controller');
var api = express.Router();
api.get('/demo/:number', ExController.demo);
module.exports = api;