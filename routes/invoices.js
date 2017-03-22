let express = require('express');
let router = express.Router();

let Invoice = require('../models/invoice');

router.get('/', function(req, res, next) {

    Invoice.find(function(err, invoices) {
        if (err) {
            console.log(err);
            res.end(err);
            return;
        }
        res.render('Invoices/index', {
            invoices: invoices
        });
    });
});

module.exports = router;