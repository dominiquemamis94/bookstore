const express = require("express");
const bookControllers = require("../controllers/bookController");
const router = express.Router();

// @route GET && POST - /books/
router
  .route("/")
  .get(bookControllers.getAllBooks)
  .post(bookControllers.createBook);

// @route GET && PUT && DELETE - /books/:id
router.route("/:id").get(bookControllers.getBookById);
router.route("/:id").put(bookControllers.updateBook);
router.route("/:id").delete(bookControllers.deleteBook);
module.exports = router;
