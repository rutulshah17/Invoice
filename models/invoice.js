/**
 * Created by Rutul Shah on 2017-03-21.
 */
let mongoose = require('mongoose');

var invoiceSchema = new mongoose.Schema({
    nameOfClient: {
        type: String,
        required: 'Client\'s name  is required'
    },
    amount: {
        type: Number,
        required: 'amount is required',
        min: 300
    },
    dateFrom: {
        type: Date,
        required: 'date is required'
    },
    dateTo:{
        type: Date,
        default: Date.now(),
        required: 'date is required'
    }
});

// make it public
module.exports = mongoose.model('Invoice', invoiceSchema);
