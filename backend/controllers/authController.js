const User = require("../models/userModel");
const Cart = require("../models/cartModel");
const Admin = require("../models/adminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createSendToken = (user, statusCode, res) => {
  const accessToken = jwt.sign(
    {
      userId: user[0].userId,
      isAdmin: user[0].admin,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  res.cookie("jwt", accessToken, cookieOptions);

  res.status(statusCode).json({
    status: "success",
    accessToken,
    data: user,
  });
};

const register = async (req, res) => {
  const { username, password, email } = req.body;
  // 1) Check if information is full
  if (!username || !password || !email) {
    return res.status(400).json({
      status: "fail",
      message: "Vui lòng nhập đầy đủ thông tin!",
    });
  }
  // 2) Check if user exists
  const checkUsername = await User.getUserByUsername(username);
  if (checkUsername[0]) {
    return res.status(400).json({
      status: "fail",
      message: "Tên đăng nhập đã được sử dụng!",
    });
  }

  const checkUser = await User.getUserByEmail(email);
  if (checkUser[0]) {
    return res.status(400).json({
      status: "fail",
      message: "Email đã được sử dụng!",
    });
  }
  let hashedPassword = await bcrypt.hash(password, 10);
  const createUser = await User.createUser(username, hashedPassword, email);
  const user = await User.getUserByEmail(email);
  const cart = await Cart.createCart(user[0].userId);
  // 3) If everything ok, send token to client
  createSendToken(user, 200, res);
};

const login = async (req, res) => {
  const { email, password } = req.body;
  // 1) Check if email and password exist
  if (!email || !password) {
    return res.status(400).json({
      status: "fail",
      message: "Vui lòng nhập email và mật khẩu!",
    });
  }
  // 2) Check if user exists && password is correct
  const user = await User.getUserByEmail(email);
  if (!user[0]) {
    return res.status(400).json({
      status: "fail",
      message: "Email chưa được đăng ký!",
    });
  }
  const isEqual = await bcrypt.compare(password, user[0].password);
  if (!user || !isEqual) {
    return res.status(401).json({
      status: "fail",
      message: "Mật khẩu nhập vào không đúng!",
    });
  }
  // 3) If everything ok, send token to client
  createSendToken(user, 200, res);
};

const createAdmin = async (req, res) => {
  const { username, password, email } = req.body;
  // 1) Check if information is full
  if (!username || !password || !email) {
    return res.status(400).json({
      status: "fail",
      message: "Vui lòng nhập đầy đủ thông tin!",
    });
  }
  // 2) Check if user exists
  const checkUsername = await User.getUserByUsername(username);
  if (checkUsername[0]) {
    return res.status(400).json({
      status: "fail",
      message: "Tên đăng nhập đã được sử dụng!",
    });
  }

  const checkUser = await User.getUserByEmail(email);
  if (checkUser[0]) {
    return res.status(400).json({
      status: "fail",
      message: "Email đã được sử dụng!",
    });
  }

  let hashedPassword = await bcrypt.hash(password, 10);
  await Admin.createAdmin(username, hashedPassword, email);
  const user = await User.getUserByEmail(email);
  // 3) If everything ok, send token to client
  createSendToken(user, 200, res);
};

const signout = async (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    status: "Logout success!",
  });
};

module.exports = {
  register,
  login,
  signout,
  createAdmin,
};
