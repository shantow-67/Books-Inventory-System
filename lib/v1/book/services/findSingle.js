const { errors } = require("../../../../errors");
const { Book } = require("../../../../models");

const findSingle = async ({ id }) => {
  // If id doesn't pass then throw BadRequestError
  if (!id) {
    throw new errors.BadRequestError(`Invalid Credentials`);
  }

  try {
    // Find single book
    const book = await Book.findOne({ _id: id });

    // If book doesn't exist
    if (!book) {
      throw Error;
    }

    // Return book
    return book;
  } catch (err) {
    if (err.message) {
      console.log(`[FIND_SINGLE_BOOK] ${err.message}`);
    }

    throw new errors.NotFoundError(`Requested resource not found`);
  }
};

module.exports = { findSingle };
