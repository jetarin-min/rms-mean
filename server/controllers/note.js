var Note = require('../models/note');

var noteController = {
    list: function(req, res, next) {
        var uid = req.params.uid;
        console.log(uid);
        Note.find(
            {uid: uid},
            function(err, notes) {
                if (err){
                    res.send({
                        message: err.message,
                        success: false,
                    });
                }
                else{
                    res.json({
                        message: "Get notes",
                        success: true,
                        data: notes,
                    });
                }
        })
        .sort({date: -1});
    },
    create: function(req, res, next) {
        var note = new Note();
        note.uid = req.body.uid;
        note.text = req.body.text;
        note.save(function(err) {
            if (err){
                console.log(err);
                res.send({
                    message: err.message,
                    success: false,
                });
            }
            else{
                res.json({
                    message: 'Note created!',
                    success: true,
                });
            }
        });
    }
}

module.exports = noteController
