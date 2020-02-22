const DailySale = require('../../schemas/dailySale');
const { validateDailySale } = require('../../validatingMethods/validate');
const {virtuals}=require('../../misc/functions');
exports.Register = async (req, res) => {
    try {
        const { error } = validateDailySale(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        let data = new DailySale(req.body);
        data = await data.save();
        return res.send(data);
    } catch (err) { return res.status(400).send(err.message); }
}
exports.get = async (req, res) => {
    try {
        let data = await DailySale.find().lean({ virtuals: true });
        return res.send(data);
    } catch (err) { return res.status(400).send(err.message); }
}
exports.search = async (req, res) => {
    try {
        const { oid, page, limit, to, from } = req.query;
        page = page ? +page : 1;
        limit = limit ? +limit : 10;
        let query = {};
        if (to && from) query['createdAt'] = { $gte: new Date(from), $lte: new Date(to) }
        if (oid) query.orderNo = oid;
        let data = await Company.aggregate([
            { $match: query },
            // {
            //     $lookup:
            //     {
            //         from: "item",
            //         localField: "_id",
            //         foreignField: "companyId",
            //         as: "items"
            //     }
            // },
            {
                $facet: {
                    metadata: [{ $count: "totalOrders" },
                    {
                        $addFields: {
                            page: page,
                            limit: limit,
                            pages: { $ceil: { $divide: ["$totalOrders", limit] } }
                        }
                    }],
                    data: [{ $skip: (page * limit - limit) }, { $limit: limit }]
                }
            }
        ]);
        doc[0].data = virtuals(doc[0].data);
        return res.status(200).send(doc[0]);
    } catch (err) { return res.status(400).send(err.message); }
}
