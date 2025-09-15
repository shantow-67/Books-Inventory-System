const { Transaction } = require("../../../../models");
const { errors } = require("../../../../errors");

const create = async ({ action, bookId, userId, bookPrice, quantity }) => {
  if (!bookId || !userId || !action || !bookPrice || !quantity) {
    throw new errors.BadRequestError(`Invalid credentials`);
  }

  // Data for a new transaction
  const transactionData = {
    action,
    bookId,
    userId,
    bookPrice,
    quantity,
    totalCost: +(bookPrice * quantity).toFixed(2),
  };

  // If action is equal to borrow, then returnDate will be added to the transactionData object.
  if (action === "borrow") {
    // The return date will be generated automatically. The return date will be 7 days after the transaction date.
    let returnDate = new Date();
    returnDate.setDate(returnDate.getDate() + 7);

    // Now add the returnDate to the transactionData object.
    transactionData.returnDate = returnDate;
  }

  try {
    // Create a new transaction
    const transaction = new Transaction(transactionData);
    await transaction.save();

    // If transaction doesn't create
    if (!transaction) {
      throw Error;
    }

    // Return the final transaction
    return transaction;
  } catch (err) {
    if (err.message) {
      console.log(`[TRANSACTION_CREATE] ${err.message}`);
    }

    throw new errors.InternalServerError(`Transaction Creation Failed`);
  }
};

module.exports = { create };
