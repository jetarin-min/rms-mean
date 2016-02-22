var express = require('express');
var router = express.Router();
var authenController = require('../controllers/authen');

router.post('/login', authenController.login);

module.exports = router;
