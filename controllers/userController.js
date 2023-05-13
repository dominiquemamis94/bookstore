require("dotenv").config();
const User = require("../models/User");

const jwt = require("jsonwebtoken");

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const [user, _] = await User.getUser(username, password);
    if (!user || user.length == 0) {
      res.status(403).json({ error: "Invalid Login" });
    }
    const token = jwt.sign(user[0], process.env.MY_SECRET, { expiresIn: "1h" });
    res.status(200).json({ token: token });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
