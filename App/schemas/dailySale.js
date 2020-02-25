const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');

let dSaleSchema = mongoose.Schema({
    orderNo: {
        type: Number,
        required: true,
        default: 1
    },
    items: [{
        barcode: {
            type: String,
            require: true
        },
        name: {
            type: String,
            require: true
        },
        salePrice: {
            type: Number,
            default: 0
        },
        purchasePrice: {
            type: Number,
            default: 0
        },
        companyId: {
            type: ObjectId,
            require: true
        },
        sellerId: {
            type: ObjectId,
            require: true
        },
        quantity:{
            type: Number,
            default: 0
        },
        categoryId: {
            type: ObjectId,
            require: true
        }
    }],
    subTotal: {
        type: Number,
        required: true
    },
    Discount: {
        type: Number,
        required: true
    },
    grandTotal: {
        type: Number,
        required: true
    },

    amountPayed: {
        type: Number,
        required: true
    },
    amountReturned: {
        type: Number,
        required: true
    },
}, { timestamps: true })
// dSaleSchema.virtual('orderNo').get(function () {
//     return 'OID-' + this.orderNo
// })

// // Now, the `userId` property will show up even if you do a lean query
// dSaleSchema.plugin(mongooseLeanVirtuals);
module.exports = mongoose.model('DailySale', dSaleSchema)