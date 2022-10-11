const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const bankaccountSchema = new mongoose.Schema({
  accNum: {
    type: Number,
    required: true,
    unique: true,
  },
  empid: {
    type: String,
    required: true,
    unique: true,
  },
  bankName: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
});

bankaccountSchema.plugin(uniqueValidator, {
  type: "mongoose-unique-validator",
});

module.exports = mongoose.model("BankDeatails", bankaccountSchema);
