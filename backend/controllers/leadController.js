import Lead from "../models/Lead.js";

export const getLeads = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = req.query.search || "";
        const status = req.query.status;
        const stage = req.query.stage;
        const sort = req.query.sort || "createdAt";
        const order = req.query.order === "asc" ? 1 : -1;
        const query = {};

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
            ];
        }

        if (status) {
            query.status = status;
        }
        if (stage) {
            query.stage = stage;
        }

        const skip = (page - 1) * limit;

        const leads = await Lead.find(query)
            .sort({ [sort]: order })
            .skip(skip)
            .limit(limit);
        const total = await Lead.countDocuments(query);

        res.json({
            total,
            page, 
            limit,
            leads,
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

export const getLeadById = async (req, res) => {
    try {
        const {id} = req.params;
        const lead = await Lead.findById(id);

        if(!lead) {
            return res.status(404).json({
                message: "No lead found with this Id"
            });
        }

        res.json({
            lead
        })
    } catch(err) {
        res.status(500).json({
            message: "Invalid Lead Id"
        })
    }
}

export const getLeadStat = async (req, res) => {
    try {
        const totalLeads = await Lead.countDocuments();
        
        const convertedLeads = await Lead.countDocuments({
            status: "Converted",
        });

        const leadByStageAgg = await Lead.aggregate([
            {
                $group: {
                    _id: "$stage",
                    count: { $sum: 1 },
                },
            },
        ]);

        const leadByStage = {};
        leadByStageAgg.forEach((item) => {
            leadByStage[item._id] = item.count;
        });

        res.json({
            totalLeads,
            convertedLeads,
            leadByStage
        });
    } catch(err) {
        res.status(500).json({
            message: err.message
        })
    }
}