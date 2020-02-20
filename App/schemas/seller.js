const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const sellerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    cnic: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },

}, {
    timestamps: true
});

module.exports = mongoose.model('Seller', sellerSchema);
