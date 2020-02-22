const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const itemSchema = mongoose.Schema({
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
    stockIn: {
        type: Number,
        default: 0
    },
    active: {
        type: Boolean,
        default: true
    },
    companyId: {
        type: ObjectId,
        ref: 'Company',
        require: true
    }
    ,
    sellerId: {
        type: ObjectId,
        ref: 'Seller',
        require: true
    },
    categoryId: {
        type: ObjectId,
        ref: 'Category',
        require: true
    },
    endingLimit:{
        type:Boolean,
        default:false
    }
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);
