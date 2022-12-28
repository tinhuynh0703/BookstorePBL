const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const getAllUser = async (req, res) => {
  const user = await User.getAllUser();
  res.status(200).json({
    user: user,
  });
};

const getUserByUsername = async (req, res) => {
  const username = req.params.username;
  const user = await User.getUserByUsername(username);
  res.status(200).json({
    user: user,
  });
};

const updateUserByUsername = async (req, res) => {
  const username = req.params.username;
  const { phonenumber, address, birthname } = req.body;
  const user = await User.updateUserByUsername(
    username,
    phonenumber,
    address,
    birthname
  );
  res.status(200).json({
    message: "Cập nhật thông tin thành công!",
  });
};

const changePasswordByUsername = async (req, res) => {
  const username = req.params.username;
  const { newPassword, confirmPassword } = req.body;
  if (newPassword === confirmPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.changePasswordByUsername(username, hashedPassword);
    res.status(200).json({
      message: "Thay đổi mật khẩu thành công!",
    });
  } else {
    res.status(400).json({
      message: "Mật khẩu mới không khớp!",
    });
  }
};

module.exports = {
  getAllUser,
  getUserByUsername,
  updateUserByUsername,
  changePasswordByUsername,
};
