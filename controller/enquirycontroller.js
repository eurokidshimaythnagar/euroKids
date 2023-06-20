const enquiryModel = require("../model/enquiryModel");
const moment = require("moment");
require("moment-timezone");
const enquiryRequest = async (req, res) => {
  try {
    let data = req.body;

    moment.tz.setDefault("Asia/Kolkata");
    let dates = moment().format("YYYY-MM-DD");//2023-06-11
    let times = moment().format("HH:mm:ss");//
    data.date = dates;
    data.time = times;
    let savedata = await enquiryModel.create(data);
    res.status(201).send({ status: true, data: savedata });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};
//===============================================================
const getenquiries = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    const filter = req.query;
    const sortOptions = {};
    let data = [];

    if (Object.keys(filter).length === 0) {
      // No query parameters provided
      sortOptions.createdAt = -1;
      const data = await enquiryModel
        .find({ isDeleted: false })
        .sort(sortOptions);
      return res.status(200).send({ status: true, data: data });
    } else {
      const filterDate = filter.date;
      data = await enquiryModel.aggregate([
        { $match: { isDeleted: false, date: filterDate } },
        { $group: { _id: "$mobile", doc: { $first: "$$ROOT" } } },
        { $replaceRoot: { newRoot: "$doc" } },
        { $sort: { createdAt: -1 } },
      ]);
    }

    return res.status(200).send({ status: true, data: data });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};
//===================================================
const sortenquiries = async (req, res) => {
  try {
    const filter = req.query;
    const sortOptions = {};

    if (Object.keys(filter).length === 0) {
      // No query parameters provided, sort by createdAt in descending order
      sortOptions.createdAt = -1;
      const data = await enquiryModel
        .find({ isDeleted: false })
        .sort(sortOptions);
      return res.status(200).send({ status: true, data: data });
    } else {
      // Sort by the provided filter parameters
      const data = await enquiryModel.find({ isDeleted: false }).sort(filter);
      return res.status(200).send({ status: true, data: data });
    }
  } catch (error) {
    return res.send({ status: false, message: error.message });
  }
};
//=================================================================

const dupilicateEnquiries = async (req, res) => {
  try {
    const repeatedPhoneNumbers = await enquiryModel.aggregate([
      {
        $group: {
          _id: "$mobile",
          docs: { $push: "$$ROOT" },
          count: { $sum: 1 },
        },
      },
      { $match: { count: { $gt: 1 } } },
      { $project: { count: 1, docs: 1, _id: 0, phoneNumber: "$_id" } },
    ]);

    return res.status(200).send({ status: true, data: repeatedPhoneNumbers });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = {
  enquiryRequest,
  getenquiries,
  sortenquiries,
  dupilicateEnquiries,
};
