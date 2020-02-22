const Joi = require('joi');
exports.validateUserLogin = (user) => {
    const schema =
    {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required()
    }
    return Joi.validate(user, schema);
}
// exports.validateUserRegister = (user) => {
//     const schema =
//     {
//         name: Joi.string().required(),
//         email: Joi.string().min(5).max(255).required().email(),
//         password: Joi.string().min(5).max(1024).required(),
//         isAdmin: Joi.boolean()
//     }
//     return Joi.validate(user, schema);
// }
// exports.validateUserSalary = (details) => {
//     const schema =
//     {
//         uid: Joi.object().keys({
//             item: Joi.object().required()
//         }).required(),
//         salary_type: Joi.object().keys({
//             catagory: Joi.string().required(),
//             amount: Joi.number().integer().required()
//         }).required(),
//         upto_current_month_remaining: Joi.number().integer()
//     }
//     return Joi.validate(details, schema);
// }

// exports.validateTransaction = (details) => {
//     const schema = {
//         uid: Joi.object().keys({
//             item: Joi.object().required()
//         }),
//         amount_payed: Joi.number().integer()
//     }
//     return Joi.validate(details, schema)
// }
exports.validate_item_reg = (details) => {
    const schema = {
        barcode: Joi.string().required(),
        name: Joi.string().required(),
        salePrice: Joi.number().integer(),
        purchasePrice: Joi.number().integer(),
        stockIn: Joi.number().integer(),
        companyId: Joi.required(),
        sellerId: Joi.required(),
        categoryId: Joi.required(),
        endingLimit: Joi.boolean(),

    }
    return Joi.validate(details, schema)
}
// exports.validate_courier_reg = (details) => {
//     let service = Joi.object().keys({
//         item_id: Joi.object().required(),
//         count: Joi.number().required(),
//         price: Joi.number().required()
//     })
//     const schema = {
//         uid: Joi.object().keys({
//             item: Joi.object().required()
//         }),
//         vehical_no: Joi.string().required(),
//         sendItems: Joi.array().items(service).required(),
//         returnItems: Joi.array().items(service).required()
//     }
//     return Joi.validate(details, schema)
// }
exports.validateCategoryReg = (details) => {
    const schema = {
        name: Joi.string().required(),
    }
    return Joi.validate(details, schema)
}

exports.validateSellerReg = (details) => {
    const schema = {
        name: Joi.string().required(),
        cnic: Joi.string().required(),
        phoneNo: Joi.string().required(),
    }
    return Joi.validate(details, schema)
}
exports.validateDailySale = (details) => {
    let service = Joi.object().keys({
        barcode: Joi.string().required(),
        name: Joi.string().required(),
        salePrice: Joi.number().integer(),
        purchasePrice: Joi.number().integer(),
        companyId: Joi.object().required(),
        sellerId: Joi.object().required(),
        categoryId: Joi.object().required(),
    })
    const schema = {
        orderNo: Joi.number().required(),
        items: Joi.array().items(service),
        subTotal: Joi.number().required(),
        Discount: Joi.number().required(),
        grandTotal: Joi.number().required(),
        amountPayed: Joi.number().required(),
        amountReturned: Joi.number().required()
    }
    return Joi.validate(details, schema)
}
