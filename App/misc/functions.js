const mongoose = require('mongoose');
const DailySale = require('../schemas/dailySale');
exports.id_convertor = (id) => {
    return mongoose.Types.ObjectId(id)
}
exports.virtuals = (document) => {
    document = document.map(p => {
        p = new DailySale(p)
        let oid = p.orderNo
        p = p.toJSON();
        p.orderNo = oid
        return p;
    })
    return document;
}