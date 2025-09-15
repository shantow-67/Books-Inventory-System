const { Transaction } = require("../../../../models");
const { errors } = require("../../../../errors");
const { StatusCodes } = require("http-status-codes");

const remove = async ({ id }) => {
  // If id doesn't pass then throw BadRequestError
  if (!id) {
    throw new errors.BadRequestError(`Invalid Credentials`);
  }

  try {
    // Delete transaction
    const transaction = await Transaction.findOneAndDelete({ _id: id });

    // If transaction doesn't exist
    if (!transaction) {
      throw new errors.NotFoundError(`Requested resource not found`);
    }

    // If the transaction is deleted successfully, then return a delCode.
    return { delCode: 204 };
  } catch (err) {
    if (err.message) {
      console.log(`[REMOVE_TRANSACTION] ${err.message}`);
    }

    // If error is instance of NotFoundError
    if (err.code === StatusCodes.NOT_FOUND) {
      throw new errors.NotFoundError(err.message);
    }

    throw new errors.InternalServerError(`Transaction Deletion Failed`);
  }
};

module.exports = { remove };
