const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const departmentSchema = new mongoose.Schema({
  empid: {
    type: String,
    required: true,
    unique: true,
  },
  jobrole: {
    type: String,
    required: true,
  },
  basesalary: {
    type: Number,
    required: true,
  },
  depetfield: {
    type: String,
    required: true,
  },
  empstate: {
    type: String,
    required: true,
  },
});

departmentSchema.plugin(uniqueValidator, { type: "mongoose-unique-validator" });

module.exports = mongoose.model("DepartmentDeatails", departmentSchema);
