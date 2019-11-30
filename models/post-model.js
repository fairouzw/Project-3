const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//const moment = require('moment')

const postSchema = new Schema(
  {
    imgUrl: String,
    location: { lat: Number, long: Number },
    address: String,
    description: String,
    postname: String,
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    tags: Array,
    categories: {
      type: String, // try to implement following category-tags
      enum: ["food", "electronics", "furniture", "clothes", "dishes"]
    },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    expireDate: {
      type: String
      //default: () => moment().format('MMM Do YY')
    }
  },
  {
    timestamps: true
  }
);
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
