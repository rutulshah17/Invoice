let express = require('express');
let router = express.Router();

let Invoice = require('../models/invoice');

//to get the date in the format yyyy-mm-dd, as this is the format which is supported by html datepicker
function convertDate(date) {

    var dateFrom = date.getUTCFullYear() + "-";
    var month = date.getUTCMonth() + 1;
    dateFrom += (month < 10) ? "0" + month + "-" : month + "-";
    var date = date.getUTCDate();
    dateFrom += (date < 10) ? "0" + date : date;
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
            dateTo: dateTo,
            title: 'List of Invoices',
            user: req.user
        });
    });
});

router.get('/add', function (req, res, next) {
    res.render('Invoices/add', {
        title: 'Invoices',
        user: req.user
    })
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
router.get('/:_id', function (req, res, next) {
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
            dateTo: convertDate(invoice.dateTo),
            title: 'Invoice Details',
            user: req.user
        })
    });
});


//POST /invoices/_id - save the updated invoice
router.post('/:_id', function (req, res, next) {
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


// GET /books/delete/_id - delete and refresh the index view
router.get('/delete/:_id', function(req, res, next) {
    // get the id parameter from the end of the url
    let _id = req.params._id;

    // use Mongoose to delete
    Invoice.remove({ _id: _id }, function(err) {
        if (err) {
            console.log(err);
            res.render('error');
            return;
        }
        res.redirect('/invoices');
    });
});
module.exports = router;