const Seller = require('../../schemas/seller');
const { validateSellerReg } = require('../../validatingMethods/validate')
exports.reg = async (req, res) => {
    try {
        const { error } = validateSellerReg(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        let data = await Seller.findOne({ 'cnic': req.body.cnic }).lean()
        if (data) return res.status(400).send('Seller against this CNIC is already Registered')
        data = new Seller(req.body);
        data = await data.save();
        return res.send(data)
    } catch (err) { return res.status(400).send(err.message); }
}
//For Combo
exports.get = async (req, res) => {
    try {
        let data = await Seller.find().lean();
        return res.send(data);
    } catch (err) { return res.status(400).send(err.message); }
}
//for displaying on table
exports.search = async (req, res) => {
    try {
        const { id, name, cnic, page, limit } = req.query;
        page = page ? +page : 1;
        limit = limit ? +limit : 10;
        let query = {};
        if (name) query.name = name;
        if (cnic) query.cnic = cnic;
        if (id) query._id = id;
        let data = await Courier.aggregate([
            { $match: query },
            {
                $lookup:
                {
                    from: "item",
                    localField: "_id",
                    foreignField: "sellerId",
                    as: "items"
                }
            },
            {
                $facet: {
                    metadata: [{ $count: "totalSellers" },
                    {
                        $addFields: {
                            page: page,
                            limit: limit,
                            pages: { $ceil: { $divide: ["$totalSellers", limit] } }
                        }
                    }],
                    data: [{ $skip: (page * limit - limit) }, { $limit: limit }]
                }
            }
        ]);
        return res.send(data[0])
    } catch (err) { return res.status(400).send(err.message); }
}
exports.update = async (req, res) => {
    try {
        let { id } = req.params;
        let data = await Seller.findByIdAndUpdate(id, req.body, { new: true })
        return res.send(data);
    } catch (err) { return res.status(400).send(err.message); }
}



