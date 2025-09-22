const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: String,
  addr: String,
  city: String,
  phone: String,
});

module.exports = mongoose.model("Address", addressSchema);
