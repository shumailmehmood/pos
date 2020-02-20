const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId
let dSaleSchema = mongoose.Schema({
    courierId: {
        item: {
            type: ObjectId,
            require: true
        }
    },
}, { timestamps: true })
module.exports = mongoose.model('DailySale', dSaleSchema)