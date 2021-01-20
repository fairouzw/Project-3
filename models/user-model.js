const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: String,
    email: String,
    password: String,
    city: String,
    country: String,
    confirmed: {
      type: Boolean,
      default: false,
    },
    follows: {
      type: String,
      enum: ["food", "electronics", "furniture", "clothes", "dishes"],
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);

module.exports = User;
