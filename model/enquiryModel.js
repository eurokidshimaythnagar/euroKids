const mongoose = require("mongoose");
const enquiriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
    mobile: {
      type: String,
      require: true,
      trim: true,
    },
    Email: {
      type: String,
      require: true,
      trim: true,
    },
    program:{
        type:String,
        enum:["playgroup","nursery","eurojunior","eurosenior"]
    },
    date: {
      type: String,
    },
    time: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("enquiries", enquiriesSchema);
