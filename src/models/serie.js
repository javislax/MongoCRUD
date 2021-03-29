const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SerieSchema = new Schema({
  platform: { type: Schema.Types.ObjectId, ref: "platform" },
  name: String,
  type: String,
  saveAt: { type: Date, Default: Date.now },
  updateAt: { type: Date, default: Date.now },
});

const SerieModel = mongoose.model("series", SerieSchema);

module.exports = SerieModel;
