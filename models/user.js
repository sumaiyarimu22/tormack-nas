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
  ipAddress: {
    typr: "String",
    required: true,
  },
});

//static signup method
userSchema.static.signup = async function (
  /*function expression supports this key word */
  name,
  username,
  email,
  password,
  ipAddress
) {
  //validation
  if (!name || !username || !email || !password || !ipAddress) {
    throw Error("All fiels must be filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("Invalid email");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error(
      "Password is not Strong .must be used 8+ chars with uppercase, lowercase, number and symbol"
    );
  }

  const existeEmail = await this.findOne({ email });
  if (existeEmail) {
    throw Error("Email already in use");
  }

  //hasing password
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(password, salt);

  //creating user
  const user = await this.create({
    name,
    username,
    email,
    password: hashPass,
    ipAddress,
  });

  return user;
};

//static login method

userSchema.static.login = async function (email, password, ipAddress) {
  if (!email || !password || !ipAddress) {
    throw Error("All fiels must be filled");
  }

  const user = await this.findOne({ email, ipAddress });
  if (!user) {
    throw Error("Incorrect email or restricted ip address.");
  }
  //comparing password
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
