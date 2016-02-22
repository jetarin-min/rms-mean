var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var config = require('../../config');

router.use(function(req, res, next) {
    //var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.token;
    var token = req.cookies.token;
    var userid = req.cookies.userid;
    if (token) {
        //Check token
        jwt.verify(token, config.secret+userid, function(err, decoded) {      
            if (err) { //Wrong token
                return res.json({ success: false, message: 'Failed to authenticate token.' });    
            }
            else {
                req.decoded = decoded;    
                next();
            }
        });
    }
    else {
        // Missing token
        /*
        return res.status(403).send({ 
            success: false, 
            message: 'No token provided.' 
        });
        */
        res.json({
            success: false, 
            message: 'No token provided.' 
        });
    }
});
var userController = require('../controllers/user');
var productController = require('../controllers/product');
var noteController = require('../controllers/note');

//User
router
    .get('/user', userController.list)
    .post('/user', userController.create);
//Note
router
    .get('/note/:uid', noteController.list)
    .post('/note', noteController.create);
//Product
router
    .get('/product', productController.list)
    .get('/product/:id', productController.detail)
    .post('/product', productController.create)
    .put('/product/:id', productController.edit)
    .delete('/product/:id', productController.remove);

module.exports = router;
