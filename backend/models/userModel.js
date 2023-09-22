const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const schema = mongoose.Schema;

const userSchema = new schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.statics.signUp = async function (email, password) {
  const exists = await this.findOne({ email });
  //validation
  if (!email || !password) {
    throw Error("all fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("not a valid email");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("not a strong password");
  }
  if (exists) {
    throw Error("Email already in use");
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });
  return user;
};

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Email does not exist");
  }
  const isEqualPassword = await bcrypt.compare(password, user.password);
  if (!isEqualPassword) {
    throw Error("not correct password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
