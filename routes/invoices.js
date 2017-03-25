let express = require('express');
let router = express.Router();

let Invoice = require('../models/invoice');


function convertDate(date) {

    var dateFrom = date.getUTCFullYear() + "-";
    var month = date.getUTCMonth() + 1;
    dateFrom += (month < 10) ? "0" + month + "-" : month + "-";
    var date = date.getUTCDate();
    dateFrom += (date < 10) ? "0" + date : date;
    console.log("aas")
    return dateFrom;
}


router.get('/', function (req, res, next) {

    Invoice.find(function (err, invoices) {
        if (err) {
            console.log(err);
            res.end(err);
            return;
        }
        var dateFrom = [];
        var dateTo = [];
        for (var i = 0; i < invoices.length; i++) {
            dateFrom.push(convertDate(invoices[i].dateFrom));
            dateTo.push(convertDate(invoices[i].dateTo));
        }
        res.render('Invoices/index', {
            invoices: invoices,
            dateFrom: dateFrom,
            dateTo: dateTo
        });
    });
});

router.get('/add', function (req, res, next) {
    res.render('Invoices/add')
});

router.post('/add', function (req, res, next) {
    Invoice.create({
        nameOfClient: req.body.nameOfClient,
        amount: req.body.amount,
        dateFrom: req.body.dateFrom,
        dateTo: req.body.dateTo
    }, function (err, invoice) {
        if (err) {
            console.log(err);
            res.render('error');
            return;
        }
        res.redirect('/invoices');
    });
});

//GET /invoices_id - show edit page and paste it in the selected invoice
router.get('/edit/:_id', function (req, res, next) {
    //grab id from url
    var _id = req.params._id;
    //use mongoose to find the selected invoice
    Invoice.findById(_id, function (err, invoice) {
        if (err) {
            console.log(err);
            res.render('error');
            return;
        }

        res.render('invoices/edit', {
            invoice: invoice,
            dateFrom: convertDate(invoice.dateFrom),
            dateTo: convertDate(invoice.dateTo)
        })
    });
});


//POST /invoices/_id - save the updated invoice
router.post('/edit/:_id', function (req, res, next) {
    //grab id from url
    var _id = req.params._id;

    //populate new invoice from the form
    var invoice = new Invoice({
        _id: _id,
        nameOfClient: req.body.nameOfClient,
        amount: req.body.amount,
        dateFrom: req.body.dateFrom,
        dateTo: req.body.dateTo
    });

    Invoice.update({_id: _id}, invoice, function (err) {
        if (err) {
            console.log(err);
            res.render('error');
            return;
        }
        res.redirect('/invoices');
    });
});
module.exports = router;