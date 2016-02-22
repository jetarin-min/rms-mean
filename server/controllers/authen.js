var jwt = require('jsonwebtoken');
var config = require('../../config');
var User = require('../models/user');

var authenController= {
    login:  function(req, res) {
        // find the user
        User.findOne({username: req.body.username}, function(err, user) {
            if (err) throw err;

            if (!user) {
                res.json({ success: false, message: 'Authentication failed. User not found.' });
            } 
            else if (user) {
                // check if password matches
                if (user.password != req.body.password) { //TODO Decrypt-Encrypt password
                    res.json({ success: false, message: 'Authentication failed. Wrong password.' });
                    console.log("Invalid Login");
                }
                else {
                    console.log("User "+user.name+" Logged In");
                    var token = jwt.sign(user, config.secret+user._id,{
                        expiresInMinutes: 1440 // expires in 24 hours
                    });
                    console.log("TOKEN Generated:"+token);

                    res.json({
                        success: true,
                        message: 'Authentication success',
                        token: token,
                        username: user.username,
                        userid: user._id,
                    });
                }   
            }
        });
    }
}

module.exports = authenController;
