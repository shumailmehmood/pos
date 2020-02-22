const { validateCategoryReg } = require('../../validatingMethods/validate')
const Company = require('../../schemas/company');
exports.register = async (req, res) => {
    try {
        const { error } = validateCategoryReg(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        let data = await Company.findOne({ 'name': req.body.name }).lean()
        if (data) return res.status(400).send('Company against this name is already Registered')
        data = new Company(req.body);
        data = await data.save();
        return res.send(data);
    } catch (err) { return res.status(400).send(err.message); }
}
//for select
exports.get = async (req, res) => {
    try {
        let data = await Company.find().lean();
        return res.send(data);
    } catch (err) { return res.status(400).send(err.message); }
}
//for search
exports.search = async (req, res) => {
    try {
        const { id, name, page, limit } = req.query;
        page = page ? +page : 1;
        limit = limit ? +limit : 10;
        let query = {};
        if (name) query.name = name;
        if (id) query._id = id;
        let data = await Company.aggregate([
            { $match: query },
            {
                $lookup:
                {
                    from: "item",
                    localField: "_id",
                    foreignField: "companyId",
                    as: "items"
                }
            },
            {
                $facet: {
                    metadata: [{ $count: "totalCompany" },
                    {
                        $addFields: {
                            page: page,
                            limit: limit,
                            pages: { $ceil: { $divide: ["$totalCompany", limit] } }
                        }
                    }],
                    data: [{ $skip: (page * limit - limit) }, { $limit: limit }]
                }
            }
        ]);
        return res.send(data[0])
    } catch (err) { return res.status(400).send(err.message); }
}

