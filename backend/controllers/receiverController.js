const Receiver = require("../models/receiverModel");
const User = require("../models/userModel");
const Cart = require("../models/cartModel");

const createReceiverbyUsername = async (req, res) => {
  const username = req.params.username;
  const user = await User.getUserByUsername(username);
  const userId = user[0].userId;
  const cart = await Cart.getDueCartByUserId(userId);
  const cartId = cart[0].cartId;
  await Receiver.createReceiverbyCartId(cartId, req.body);
  res.status(200).json({
    message: "Create receiver success!",
  });
};

const getReceiverByUsername = async (req, res) => {
  const username = req.params.username;
  const user = await User.getUserByUsername(username);
  const userId = user[0].userId;
  const cart = await Cart.getDueCartByUserId(userId);
  const cartId = cart[0].cartId;
  const receiver = await Receiver.getReceiverByCartId(cartId);
  res.status(200).json({
    receiver: receiver[receiver.length - 1],
  });
};

module.exports = {
  createReceiverbyUsername,
  getReceiverByUsername,
};
