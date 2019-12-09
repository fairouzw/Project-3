const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: String,
    email: String,
    password: String,
    city: String,
    country: String,
    // posts: [{ type: Schema.Types.ObjectId, ref: "post" }],
    follows: {
      type: String, // try to implement following category-tags
      enum: ["food", "electronics", "furniture", "clothes", "dishes"]
    }
  },
  {
    timestamps: true
  }
);
const User = mongoose.model("User", userSchema);

module.exports = User;
/* toJSon - use this to conceal password if testing on Post man */
