const db = require("./database");

exports.getAllComment = async () => {
  return new Promise((resolve, reject) => {
    let sql = "SELECT * FROM comment";
    db.query(sql, (err, data) => {
      if (err) console.log(err);
      else resolve(data);
    });
  });
};

exports.getCommentByBookId = async (bookId) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT commentId, comment.userId, username, bookId, content, rating, date FROM comment INNER JOIN user ON comment.userId = user.userId WHERE bookId = ${bookId}`;
    db.query(sql, (err, data) => {
      if (err) console.log(err);
      else resolve(data);
    });
  });
};

exports.postCommentbyUserId = async (userId, bookId, content, rating) => {
  const data = {
    userId,
    bookId,
    content,
    rating,
  };
  return new Promise((resolve, reject) => {
    let sql = `INSERT INTO comment SET ?`;
    db.query(sql, data, (err, data) => {
      if (err) console.log(err);
      else resolve(data);
    });
  });
};
