const Book = require("../models/Book");
const jwt = require("jsonwebtoken");
const banned_users = ["_Darth Vader_"];

// GET books List
exports.getAllBooks = async (req, res, next) => {
  try {
    const [books, _] = await Book.findAll(req.query);
    res.status(200).json({ books });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// GET book details
exports.getBookById = async (req, res, next) => {
  try {
    let bookId = req.params.id;
    const [book, _] = await Book.getBookById(bookId);
    res.status(200).json({ book: book[0] });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// POST book  - requires authentication (bearer token)
exports.createBook = async (req, res, next) => {
  try {
    if (
      !req.headers.authorization ||
      !req.headers.authorization.split(" ")[1]
    ) {
      res
        .status(403)
        .json({ success: false, message: "Error!Token was not provided." });
    }

    token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.MY_SECRET);

    if (banned_users.indexOf(decodedToken.username) > -1) {
      res.status(403).json({
        success: false,
        message:
          "Error! _Darth Vader_ is not allowed to publish his books here.",
      });
    }

    let { title, description, cover_image, price } = req.body;
    let author = decodedToken.id;
    let book = new Book(title, description, author, cover_image, price);
    book = book.save();
    res.status(201).json({ message: "Successfully created a book" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// PATCH book  - requires authentication (bearer token) - only for their own books
exports.updateBook = async (req, res, next) => {
  try {
    if (
      !req.headers.authorization ||
      !req.headers.authorization.split(" ")[1]
    ) {
      res
        .status(403)
        .json({ success: false, message: "Error!Token was not provided." });
    }
    token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.MY_SECRET);

    let bookId = req.params.id;
    const [book, _] = await Book.getBookById(bookId);

    if (decodedToken.id !== book[0].author_id) {
      res.status(403).json({
        success: false,
        message: "Error! You are not the author of this book.",
      });
    }
    let updatedBook = await Book.updateBookById(bookId, req.body);
    res.status(200).json({ message: "Successfully updated a book" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// DELETE book  - requires authentication (bearer token)
exports.deleteBook = async (req, res, next) => {
  try {
    if (
      !req.headers.authorization ||
      !req.headers.authorization.split(" ")[1]
    ) {
      res
        .status(403)
        .json({ success: false, message: "Error!Token was not provided." });
    }
    token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.MY_SECRET);

    let bookId = req.params.id;
    const [book, _] = await Book.getBookById(bookId);

    if (decodedToken.id !== book[0].author_id) {
      res.status(403).json({
        success: false,
        message: "Error! You are not the author of this book.",
      });
    }
    let deletedBook = await Book.deleteBookById(bookId);
    res.status(200).json({ message: "Successfully deleted a book" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
