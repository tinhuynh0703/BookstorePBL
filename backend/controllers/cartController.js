const Cart = require("../models/cartModel");
const User = require("../models/userModel");
const Book = require("../models/bookModel");

const getDetailCartByUsername = async (req, res) => {
  const username = req.params.username;
  const user = await User.getUserByUsername(username);
  const userId = user[0].userId;
  const cart = await Cart.getDueCartByUserId(userId);
  const cartId = cart[0].cartId;
  const cartList = await Cart.getDetailCartByCartId(cartId);
  res.status(200).json({
    status: "success",
    data: cartList,
  });
};

const addBookIntoCart = async (req, res) => {
  const username = req.params.username;
  const user = await User.getUserByUsername(username);
  const cart = await Cart.getDueCartByUserId(user[0].userId);
  const cartId = cart[0].cartId;
  const bookId = req.params.bookId;
  const amount = req.body.bookAmount;
  const book = await Book.getDetailBookById(bookId);
  const totalprice = amount * book[0].bookPrice;
  const checkBook = await Book.getBookByCart(bookId, cartId);
  if (!checkBook[0]) {
    await Cart.addBookIntoCart(cartId, bookId, amount, totalprice);
    const cartList = await Cart.getDetailCartByCartId(cartId);
    res.status(200).json({
      data: cartList,
    });
  } else {
    const newAmount = amount + checkBook[0].amount;
    const newtotalprice = totalprice + checkBook[0].totalprice;
    await Cart.updateBookFromCart(cartId, bookId, newAmount, newtotalprice);
    const cartList = await Cart.getDetailCartByCartId(cartId);
    res.status(200).json({
      data: cartList,
    });
  }
};

const deleteBookFromCart = async (req, res) => {
  const username = req.params.username;
  const bookId = req.params.bookId;
  const user = await User.getUserByUsername(username);
  const cart = await Cart.getDueCartByUserId(user[0].userId);
  const cartId = cart[0].cartId;
  await Cart.deleteBookFromCart(cartId, bookId);
  // const cartAfterDeleted = await Cart.getDueCartByUserId(user[0].userId)
  const cartListAfterDeleted = await Cart.getDetailCartByCartId(cartId);
  res.status(200).send(cartListAfterDeleted);
  // res.status(200).send({})
};

const increaseBookInCart = async (req, res) => {
  const username = req.params.username;
  const user = await User.getUserByUsername(username);
  const cart = await Cart.getDueCartByUserId(user[0].userId);
  const cartId = cart[0].cartId;
  const bookId = req.params.bookId;
  const amount = req.body.bookAmount;
  const totalprice = req.body.totalprice;
  const price = req.body.bookPrice;
  const newAmount = amount + 1;
  const newtotalprice = totalprice + price;
  await Cart.updateBookFromCart(cartId, bookId, newAmount, newtotalprice);
  const cartList = await Cart.getDetailCartByCartId(cartId);
  res.status(200).send(cartList);
};

const decreaseBookInCart = async (req, res) => {
  const username = req.params.username;
  const user = await User.getUserByUsername(username);
  const cart = await Cart.getDueCartByUserId(user[0].userId);
  const cartId = cart[0].cartId;
  const bookId = req.params.bookId;
  const amount = req.body.bookAmount;
  const totalprice = req.body.totalprice;
  const price = req.body.bookPrice;
  const userId = await User.getUserIdIdByCartId(cartId);
  if (amount == 1) {
    const cartList = await Cart.getDetailCartByCartId(cartId);
    res.status(200).send(cartList);
  } else {
    const newAmount = amount - 1;
    const newtotalprice = totalprice - price;
    await Cart.updateBookFromCart(cartId, bookId, newAmount, newtotalprice);
    const cartList = await Cart.getDetailCartByCartId(cartId);
    res.status(200).send(cartList);
  }
};

module.exports = {
  addBookIntoCart,
  getDetailCartByUsername,
  deleteBookFromCart,
  increaseBookInCart,
  decreaseBookInCart,
};
