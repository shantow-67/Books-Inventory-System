const { errors } = require("../../../../errors");
const { findSingle } = require("./findSingle");
const { StatusCodes } = require("http-status-codes");
const { transactionServicesV1 } = require("../../transaction");

const buy = async ({ id, userId, quantity }) => {
  // If id doesn't pass then throw BadRequestError
  if (!id) {
    throw new errors.BadRequestError(`Invalid Credentials`);
  }

  try {
    // Find single book
    const book = await findSingle({ id });

    // Create a new transaction
    const transaction = await transactionServicesV1.create({
      action: "purchase",
      bookId: book.id,
      userId,
      bookPrice: book.price,
      quantity,
    });

    // Return the transaction
    return transaction;
  } catch (err) {
    if (err.message) {
      console.log(`[BUY] ${err.message}`);
    }

    // If error is instance of NotFoundError
    if (err.code === StatusCodes.NOT_FOUND) {
      throw new errors.NotFoundError(err.message);
    }

    throw new errors.InternalServerError(`Book Buying Failed`);
  }
};

module.exports = { buy };
