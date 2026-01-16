import Lead from "../models/leadModel.js";

const getLeads = async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.page) || 1;

  const keyword = req.query.keyword
    ? {
        $or: [
          { name: { $regex: req.query.keyword, $options: "i" } },
          { email: { $regex: req.query.keyword, $options: "i" } },
        ],
      }
    : {};

  const status = req.query.status ? { status: req.query.status } : {};

  const source = req.query.source ? { source: req.query.source } : {};

  const sort = req.query.sort ? req.query.sort : "-createdAt";

  try {
    const count = await Lead.countDocuments({
      ...keyword,
      ...status,
      ...source,
    });
    const leads = await Lead.find({ ...keyword, ...status, ...source })
      .sort(sort)
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({ leads, page, pages: Math.ceil(count / pageSize) });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (lead) {
      res.json(lead);
    } else {
      res.status(404).json({ message: "Lead not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const getLeadAnalytics = async (req, res) => {
  try {
    const totalLeads = await Lead.countDocuments();
    const convertedLeads = await Lead.countDocuments({ status: "Converted" });
    const leadsByStage = await Lead.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    res.json({
      totalLeads,
      convertedLeads,
      leadsByStage,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export { getLeads, getLeadById, getLeadAnalytics };
