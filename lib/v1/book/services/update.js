const { errors } = require("../../../../errors");
const { Book } = require("../../../../models");
const { StatusCodes } = require("http-status-codes");

const update = async ({ id, payload = {} }) => {
  // If id doesn't pass then throw BadRequestError
  if (!id) {
    throw new errors.BadRequestError(`Invalid Credentials`);
  }

  // Dynamically check which fields are valid and set them into updateQuery.
  const updateQuery = {};
  Object.keys(payload).forEach((key) => {
    if (payload[key] !== undefined) {
      updateQuery[key] = payload[key];
    }
  });

  try {
    // Update Book
    const book = await Book.findOneAndUpdate({ _id: id }, updateQuery, {
      new: true,
      runValidators: true,
    });

    // If book doesn't exist
    if (!book) {
      throw new errors.NotFoundError(`Requested resource not found`);
    }

    // Return updated book
    return book;
  } catch (err) {
    if (err.message) {
      console.log(`[UPDATE_BOOK] ${err.message}`);
    }

    // If error is instance of NotFoundError
    if (err.code === StatusCodes.NOT_FOUND) {
      throw new errors.NotFoundError(err.message);
    }

    throw new errors.InternalServerError(`Book Updated Failed`);
  }
};

module.exports = { update };
