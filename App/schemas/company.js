const mongoose = require('mongoose');
const Company = mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Company', Company);
