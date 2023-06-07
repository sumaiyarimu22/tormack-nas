const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    typr: "String",
    required: true,
  },
  username: {
    typr: "String",
    required: true,
    unique: true,
  },
  email: {
    typr: "String",
    required: true,
    unique: true,
  },
  password: {
    typr: "String",
    required: true,
  },
  IpAddress: {
    typr: "String",
    required: true,
  },
});
module.exports = mongoose.model("User", userSchema);
