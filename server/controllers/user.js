var User = require('../models/user');

var userController = {
    list: function(req, res, next) {
        User.find(function(err, users) {
            if (err){
                res.send({
                    message: err.message,
                    success: false,
                });
            }
            else{
                res.json({
                    message: "Get users",
                    success: true,
                    data: users,
                });
            }
        });
    },
    create: function(req, res, next) {
        var user = new User();
        user.username = req.body.username;
        user.password = req.body.password; //TODO Encrypt-Decrypt password
        user.save(function(err) {
            if (err){
                console.log(err);
                res.send({
                    message: err.message,
                    success: false,
                });
            }
            else{
                res.json({
                    message: 'User created!',
                    success: true,
                });
            }
        });
    }
}
module.exports = userController
