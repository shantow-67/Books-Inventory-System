const { Transaction } = require("../../../../models");

const count = async ({ userId, bookId, search = "" }) => {
  const searchFilter = {
    action: { $regex: search, $options: "i" },
  };

  // Generate  Filter Object
  const filter = {};
  if (userId) {
    filter.userId = userId;
  }
  if (bookId) {
    filter.bookId = bookId;
  }
  // Add searchFilter in the filter object
  filter.action = searchFilter.action;

  // How many transaction exist in the database
  const totalTransactions = await Transaction.count(filter);

  return totalTransactions;
};

module.exports = { count };
