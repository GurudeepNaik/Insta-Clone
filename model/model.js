const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const instaSchema = new Schema({
  image: { type: String, required: true },
  author: { type: String, required: true },
  location: { type: String, required: true },
  discription: { type: String, required: true },
  date: { type: Date, default: Date.now },
  likes: { type: Number, required: true },
});
PostData = mongoose.model("PostData", instaSchema);
module.exports = PostData;
