const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.login(email, password);
    const token = createToken(user._id);
    if (user) return res.status(200).json({ email: user?.email, token });
    else return res.status(404).json({ error: "no such user" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
//sign up user
const signupUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.signUp(email, password);
    const token = createToken(user._id);
    return res.status(200).json({ email: user?.email, token });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

module.exports = { loginUser, signupUser };
