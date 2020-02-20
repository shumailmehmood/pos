const { validate_item_reg } = require('../../validatingMethods/validate');
const Item = require('../../schemas/item');
exports.items_register = async (req, res) => {
   try {
      let { error } = validate_item_reg(req.body);
      if (error) return res.status(400).send(error.details[0].message);
      let data = new Item(req.body);
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
      const { page, limit, name, barcode } = req.query;

      let query = {};
      if (name) query.name = name;
      if (barcode) query.barcode = barcode;
      let data = await Item.aggregate([
         { $match: query },
         {
            $lookup:
            {
               from: "seller",
               localField: "sellerId",
               foreignField: "_id",
               as: "seller"
            }
         }, {
            $lookup:
            {
               from: "category",
               localField: "categoryId",
               foreignField: "_id",
               as: "category"
            }
         }, {
            $lookup:
            {
               from: "company",
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