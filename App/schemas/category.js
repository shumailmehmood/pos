const mongoose = require('mongoose');
const Category = mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Category', Category);
