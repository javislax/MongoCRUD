const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PlatformSchema = new Schema({
  name: String,
  saveAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
});

const Model = mongoose.model("platform", PlatformSchema);

module.exports = Model;
