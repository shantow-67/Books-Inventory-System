const { Transaction } = require("../../../../models");
const { errors } = require("../../../../errors");

const findSingle = async ({ id }) => {
  // If id doesn't pass then throw BadRequestError
  if (!id) {
    throw new errors.BadRequestError(`Invalid Credentials`);
  }

  try {
    // Find single transaction
    const transaction = await Transaction.findOne({ _id: id });

    // If transaction is doesn't exist
    if (!transaction) {
      throw Error;
    }

    return transaction;
  } catch (err) {
    if (err.message) {
      console.log(`[FIND_SINGLE_TRANSACTION] ${err.message}`);
    }

    throw new errors.NotFoundError(`Requested resource not found`);
  }
};

module.exports = { findSingle };
