const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const employeeSchema = new mongoose.Schema({
  titleName: { type: String, required: true },
  empid: { type: String, required: true, unique: true },
  empPwd: { type: String, required: true },
  empName: { type: String, required: true },
  empadd: { type: String, required: true },
  empPhone: { type: Number, required: true },
  email: { type: String, required: true },
  dob: { type: Date, required: true },
  nic: { type: String, required: true },
  dateApp: { type: Date, required: true },
  gender: { type: String, required: true },
  jtype: { type: String, required: true },
  profilePic: { data: Buffer, contentType: String},
  nicPic: { data: Buffer, contentType: String },
});

employeeSchema.plugin(uniqueValidator, { type: "mongoose-unique-validator" });

module.exports = mongoose.model("Employee", employeeSchema);
