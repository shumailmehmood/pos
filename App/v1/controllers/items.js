const { validate_item_reg } = require('../../validatingMethods/validate');
const Item = require('../../schemas/item');
const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId;
exports.items_register = async (req, res) => {
   try {
      // req.body.companyId = ObjectId(req.body.companyId)
      // req.body.sellerId = ObjectId(req.body.sellerId)
      // req.body.categoryId = ObjectId(req.body.categoryId)


      let { error } = validate_item_reg(req.body);
      req.body.endingLimit = +req.body.stockIn <= 10 ? true : false
      if (error) return res.status(400).send(error.details[0].message);
      let data = await Item.findOne({ 'barcode': req.body.barcode }).lean()
      if (data) return res.status(400).send('Item against this BarCode is already Registered')
      data = new Item(req.body);
      data = await data.save();
      return res.send(data);
   } catch (err) { return res.status(400).send(err.message); }
}
//update stock in return and new stock
exports.item_update = async (req, res) => {
   try {
      const { id } = req.params;
      let data = await Item.findById(id).select('stockIn').lean();
      let add = +req.body.stockIn + data.stockIn;
      data = await Item.findByIdAndUpdate(id, { stockIn: add, endingLimit: add <= 10 ? true : false }, { new: true }).lean();
      return res.send(data)
   } catch (err) { return res.status(400).send(err.message); }
}

exports.item_get_active = async (req, res) => {
   try {
      let { page, limit, name, barcode } = req.query;
      page = page ? +page : 1;
      limit = limit ? +limit : 10;
      let query = {};
      if (name) query.name = new RegExp(name, "i");
      if (barcode) query.barcode = new RegExp(barcode, "i");
      let data = await Item.aggregate([
         { $match: query },
         {
            $lookup:
            {
               from: "sellers",
               localField: "sellerId",
               foreignField: "_id",
               as: "seller"
            }
         }, {
            $addFields: {
               seller: { $arrayElemAt: ['$seller', 0] }
            }
         },
         {
            $lookup:
            {
               from: "categories",
               localField: "categoryId",
               foreignField: "_id",
               as: "category"
            }
         },
         {
            $addFields: {
               category: { $arrayElemAt: ['$category', 0] }
            }
         }, {
            $lookup:
            {
               from: "companies",
               localField: "companyId",
               foreignField: "_id",
               as: "company"
            }
         },
         {
            $addFields: {
               company: { $arrayElemAt: ['$company', 0] }
            }
         },

         {
            $facet: {
               metadata: [{ $count: "total_items" },
               { $addFields: { page: page, limit: limit, pages: { $ceil: { $divide: ["$total_items", limit] } } } },
               ],
               data: [{ $skip: (page * limit - limit) }, { $limit: limit }],
            }
         },
      ])
      return res.send(data[0]);
   } catch (err) { return res.status(400).send(err.message); }

}
exports.fetch = async (req, res) => {
   try {
      const { barcode } = req.query;
      let data = await Item.findOne({ 'barcode': new RegExp(barcode, 'i') }).lean();
      if (data) {
         let stock = +data.stockIn - 1
         let body = {
            stockIn: stock,
            endingLimit: stock <= 10 ? true : false
         }
         await Item.update({ 'barcode': new RegExp(barcode, 'i') }, body);
         return res.send(data);
      }
      return res.status(400).send("BarCode Not Registered")
   } catch (err) { return res.status(400).send(err.message); }
}
