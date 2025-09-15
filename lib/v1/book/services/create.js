const { Book } = require("../../../../models");
const { errors } = require("../../../../errors");
const { StatusCodes } = require("http-status-codes");

const create = async ({
  title,
  cover,
  author,
  isbn,
  publicationDate,
  category,
  description,
  price,
  quantity,
  condition,
}) => {
  // If any of the essential book information is missing, then it will throw a BadRequestError.
  if (
    !title ||
    !cover ||
    !author ||
    !isbn ||
    !publicationDate ||
    !category ||
    !description ||
    !price ||
    !quantity ||
    !condition
  ) {
    throw new errors.BadRequestError(`Invalid credentials`);
  }

  try {
    // Book already exist or not
    const isExistBook = await Book.findOne({ isbn });
    if (isExistBook) {
      throw new errors.BadRequestError(`Book already exist`);
    }

    // Create a new book
    const book = new Book({
      title,
      cover,
      author,
      isbn,
      publicationDate,
      category,
      description,
      price,
      quantity,
      condition,
    });
    await book.save();

    // If new book doesn't create
    if (!book) {
      throw Error;
    }

    // Return newly created book
    return book;
  } catch (err) {
    if (err.message) {
      console.log(`[CREATE_BOOK] ${err.message}`);
    }

    // If err is instance of BadRequestError
    if (err.code === StatusCodes.BAD_REQUEST) {
      throw new errors.BadRequestError(err.message);
    }

    throw new errors.InternalServerError(`Book Creation Failed`);
  }
};

module.exports = { create };
