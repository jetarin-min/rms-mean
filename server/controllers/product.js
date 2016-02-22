var Product = require('../models/product');

var productController = {
    list: function(req, res, next) {
        Product.find(
            function(err, products) {
                if (err){
                    res.send({
                        message: err.message,
                        success: false,
                    });
                }
                else{
                    res.json({
                        message: "Get product",
                        success: true,
                        data: products,
                    });
                }
        })
        .sort({code: 1});
    },
    detail: function(req, res, next) {
        var id = req.params.id
        Product.findOne(
            {_id: id}, 
            function(err, products) {
                if (err){
                    res.send({
                        message: err.message,
                        success: false,
                    });
                }
                else{
                    res.json({
                        message: "Get product",
                        success: true,
                        data: products,
                    });
                }
        });
    },
    create: function(req, res, next) {
        var product = new Product();
        product.name = req.body.name;
        product.code = req.body.code;
        product.price = req.body.price;
        product.save(function(err) {
            if (err){
                console.log(err);
                res.send({
                    message: err.message,
                    success: false,
                });
            }
            else{
                res.json({
                    message: 'Product created!',
                    success: true,
                });
            }
        });
    },
    remove: function(req, res, next) {
        var id = req.params.id; 
        Product.remove(
            {_id: id},
            function(err) {
                if (err){
                    console.log(err);
                    res.send({
                        message: err.message,
                        success: false,
                    });
                }
                else{
                    res.json({
                        message: 'Product Deleted!',
                        success: true,
                    });
                }
        });
    },
    edit: function(req, res, next) {
        var id = req.params.id; 
        Product.findOneAndUpdate(
            {_id: id},
            req.body,
            function(err) {
                if (err){
                    console.log(err);
                    res.send({
                        message: err.message,
                        success: false,
                    });
                }
                else{
                    res.json({
                        message: 'Product Edited!',
                        success: true,
                    });
                }
        });
    }
}
module.exports = productController;
