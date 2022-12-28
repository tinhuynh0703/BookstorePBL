const Book = require("../models/bookModel");

const getAllBook = async (req, res) => {
  const bookList = await Book.getAllBook(req.query.page);
  res.status(200).json({
    bookList: bookList,
  });
};

const createBook = async (req, res) => {
  await Book.createBook(req.body);
  res.status(200).json({
    message: "Thêm sách thành công!",
  });
};

const deleteBookById = async (req, res) => {
  const bookId = req.params.bookId;
  await Book.deleteBookById(bookId);
  res.status(200).json({
    message: "Xóa sách thành công!",
  });
};

const getBookByCategoryId = async (req, res) => {
  const catId = req.params.catId;
  const page = req.query.page;
  const bookList = await Book.getBookByCategoryId(catId, page);
  res.status(200).json({
    bookList: bookList,
  });
};

const getDetailBookById = async (req, res) => {
  const bookId = req.params.bookId;
  const book = await Book.getDetailBookById(bookId);
  res.status(200).json({
    book: book,
  });
};

const updateBookById = async (req, res) => {
  const bookId = req.params.bookId;
  await Book.updateBookById(bookId, req.body);
  res.status(200).json({
    message: "Cập nhật thông tin sách thành công!",
  });
};

const searchBook = async (req, res) => {
  const keyword = req.query.keyword;
  if (!keyword) {
    res.status(400).json({
      message: "Tìm sản phẩm mong muốn...",
    });
  }
  const data = await Book.searchBook(keyword);
  res.status(200).json({
    data,
  });
};

module.exports = {
  getAllBook,
  getDetailBookById,
  getBookByCategoryId,
  updateBookById,
  createBook,
  deleteBookById,
  searchBook,
};
