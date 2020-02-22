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
      let data = await Item.findByIdAndUpdate(id, req.body, { new: true }).lean();
      return res.send(data)
   } catch (err) { return res.status(400).send(err.message); }
}

exports.item_get_active = async (req, res) => {
   try {
      let { page, limit, name, barcode } = req.query;
      page = page ? +page : 1;
      limit = limit ? +limit : 10
      let query = {};
      if (name) query.name = name;
      if (barcode) query.barcode = barcode;
     
      let data = await Item.aggregate([
         { $match: query },
         {
            $lookup:
            {
               from: "Seller",
               localField: "sellerId",
               foreignField: "_id",
               as: "seller"
            }
         }, {
            $lookup:
            {
               from: "Category",
               localField: "categoryId",
               foreignField: "_id",
               as: "category"
            }
         }, {
            $lookup:
            {
               from: "Company",
               localField: "companyId",
               foreignField: "_id",
               as: "company"
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