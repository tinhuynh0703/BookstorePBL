const Admin = require("../models/adminModel");
const bcrypt = require("bcrypt");

const getAllAdmin = async (req, res) => {
  const admins = await Admin.getAllAdmin();
  res.status(200).json({
    admins,
  });
};

const resetPasswordByUsername = async (req, res) => {
  const username = req.params.username;
  const password = "123456789";
  const hashedPassword = await bcrypt.hash(password, 10);
  await Admin.resetPasswordByUsername(username, hashedPassword);
  res.status(200).json({
    message: "Đặt lại mật khẩu thành công!",
  });
};

module.exports = {
  getAllAdmin,
  resetPasswordByUsername,
};
