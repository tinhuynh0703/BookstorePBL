const Bill = require("../models/billModel.js");
const User = require("../models/userModel");
const Cart = require("../models/cartModel");
const Receiver = require("../models/receiverModel");

const getBillByUsername = async (req, res) => {
  const username = req.params.username;
  const user = await User.getUserByUsername(username);
  const userId = user[0].userId;
  const billList = await Bill.getBillByUserId(userId);
  res.status(200).json({
    billList: billList,
  });
};

const getBillByBillId = async (req, res) => {
  const billId = req.params.billId;
  const bill = await Bill.getBillByBillId(billId);
  res.status(200).json({
    bill,
  });
};

const createBill = async (req, res) => {
  const username = req.params.username;
  const user = await User.getUserByUsername(username);
  const userId = user[0].userId;
  const cart = await Cart.getDueCartByUserId(userId);
  const cartId = cart[0].cartId;
  await Bill.createBill(cartId, userId, req.body);
  await Cart.changeDueCartStatus(userId);
  await Cart.createCart(userId);
  res.status(200).json({
    message: "Create bill success!",
  });
};

const getBookByBillId = async (req, res) => {
  const billId = req.params.billId;
  const data = await Bill.getBookByBillId(billId);
  const receiver = await Receiver.getReceiverByBillId(billId);
  res.status(200).json({
    data,
    receiver: receiver[receiver.length - 1],
  });
};

module.exports = {
  getBillByUsername,
  createBill,
  getBillByBillId,
  getBookByBillId,
};
