var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.sendfile('./server/views/login.html');
});

module.exports = router;

