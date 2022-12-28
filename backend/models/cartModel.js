const db = require("./database");

exports.getDueCartByUserId = async (userId) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM cart WHERE userId = ${userId} AND status = 0`;
    db.query(sql, (err, data) => {
      if (err) console.log(err);
      else resolve(data);
    });
  });
};

exports.getDetailCartByCartId = async (cartId) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT book.bookId, bookName, bookImg, bookPrice, bookcart.amount, totalprice FROM bookcart INNER JOIN book ON bookcart.bookId = book.bookId WHERE cartId = ${cartId}`;
    db.query(sql, (err, data) => {
      if (err) console.log(err);
      else resolve(data);
    });
  });
};

exports.createCart = async (userId) => {
  let id = userId;
  return new Promise((resolve, reject) => {
    let sql = `INSERT INTO cart (userId) VALUES (${id})`;
    db.query(sql, (err, data) => {
      if (err) console.log(err);
      else resolve(data);
    });
  });
};

exports.addBookIntoCart = async (cartId, bookId, amount, totalprice) => {
  let cartData = {
    cartId,
    bookId,
    amount,
    totalprice,
  };
  return new Promise((resolve, reject) => {
    let sql = "INSERT INTO bookcart SET ?";
    db.query(sql, cartData, (err, data) => {
      if (err) console.log(err);
      else resolve(data);
    });
  });
};

exports.updateBookFromCart = async (cartId, bookId, amount, totalprice) => {
  let cartData = {
    amount,
    totalprice,
  };
  return new Promise((resolve, reject) => {
    let sql = `UPDATE bookcart SET ? WHERE cartId = ${cartId} AND bookId = ${bookId}`;
    db.query(sql, cartData, (err, data) => {
      if (err) console.log(err);
      else resolve(data);
    });
  });
};

exports.deleteBookFromCart = async (cartId, bookId) => {
  let cartData = {
    cartId,
    bookId,
  };
  return new Promise((resolve, reject) => {
    let sql = `DELETE FROM bookcart WHERE cartId = ${cartId} AND bookId = ${bookId}`;
    db.query(sql, cartData, (err, data) => {
      if (err) console.log(err);
      else resolve(data);
    });
  });
};

exports.changeDueCartStatus = async (userId) => {
  return new Promise((resolve, reject) => {
    let sql = `UPDATE cart SET status = 1 WHERE userId = ${userId} AND status = 0`;
    db.query(sql, (err, data) => {
      if (err) console.log(err);
      else resolve(data);
    });
  });
};
