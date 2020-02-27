const mongoose = require('mongoose');
//Creation of Schema...
const customerSchema = new mongoose.Schema({
    isGold: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    phone: {
        type: String,
        maxlength: 12,
        minlength: 10,
        required: true
    }
});

//Creation of collection..
const Customer = mongoose.model('Customer', customerSchema);

exports.customerSchema = customerSchema;
exports.Customer = Customer;