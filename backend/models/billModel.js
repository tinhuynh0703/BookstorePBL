const db = require("./database");

exports.getBillByUserId = async (userId) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM bill WHERE userId = ${userId} ORDER BY date DESC`;
    db.query(sql, (err, data) => {
      if (err) console.log(err);
      else resolve(data);
    });
  });
};

exports.getBillByBillId = async (billId) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM bill WHERE billId = ${billId}`;
    db.query(sql, (err, data) => {
      if (err) console.log(err);
      else resolve(data);
    });
  });
};

exports.createBill = async (cartId, userId, body) => {
  const { price, ship, discount, totalPrice } = body;
  const billData = { cartId, userId, price, ship, discount, totalPrice };
  return new Promise((resolve, reject) => {
    let sql = `INSERT INTO bill SET ?`;
    db.query(sql, billData, (err, data) => {
      if (err) console.log(err);
      else resolve(data);
    });
  });
};

exports.getBookByBillId = async (billId) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT book.bookId, book.bookName, book.bookAuthor, book.bookImg, bookcart.amount, bookcart.totalprice FROM bookcart INNER JOIN book ON bookcart.bookId = book.bookId INNER JOIN bill ON bookcart.cartId = bill.cartId WHERE bill.billId = ${billId}`;
    db.query(sql, (err, data) => {
      if (err) console.log(err);
      else resolve(data);
    });
  });
};

exports.getAllBills = async () => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT billId FROM bill ORDER BY billId DESC`;
    db.query(sql, (err, data) => {
      if (err) console.log(err);
      else resolve(data);
    });
  });
};

exports.deleteBillById = async (billId) => {
  return new Promise((resolve, reject) => {
    let sql = `DELETE FROM bill WHERE billId = ${billId}`;
    db.query(sql, (err, data) => {
      if (err) console.log(err);
      else resolve(data);
    });
  });
};
