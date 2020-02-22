const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Seller = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    cnic: {
        type: String,
        required: true,
    },
    phoneNo: {
        type: String,
        required: true,
    },

}, {
    timestamps: true
});

module.exports = mongoose.model('Seller', Seller);
