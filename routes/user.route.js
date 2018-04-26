var express = require('express');
var UserController = require('../controllers/user.controller');
var api = express.Router();
api.get('/demo/', UserController.demo);
api.get('/demo/getUsers', UserController.getUsers);
api.post('/demo/addUser', UserController.addUser);
module.exports = api;
