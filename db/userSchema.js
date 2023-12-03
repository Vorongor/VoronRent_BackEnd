const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  password: {
    type: String,
    required: [true, "Set a password for the user"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  role: {
    type: String,
    enum: ["admin", "user", "owner"],
    default: "user",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
