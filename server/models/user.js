const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  phoneNumber: String,
  fullName: String,
  password: String,
  email: String,
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

//to create modal from schema
const User = mongoose.model("User", userSchema);
module.exports =User