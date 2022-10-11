const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const chatSchema = new mongoose.Schema({
  chatId: { type: String },
  message: { type: String },
  arisedBy: { type: String },
  timestamp: { type: String },
});

chatSchema.plugin(uniqueValidator, {
  type: "mongoose-unique-validator",
});

module.exports = mongoose.model("Chat", chatSchema);
