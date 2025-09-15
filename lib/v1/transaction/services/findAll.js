const { errors } = require("../../../../errors");
const { Transaction } = require("../../../../models");
const defaults = require("../../../../config/defaults");

const findAll = async ({
  page = defaults.page,
  limit = defaults.limit,
  sortType = defaults.sortType,
  sortBy = defaults.sortBy,
  search = defaults.search,
  userId,
  bookId,
}) => {
  try {
    // Create an essential string/object for sorting & filtering
    const sortStr = `${sortType === "dsc" ? "-" : ""}${sortBy}`;
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

    // Find all transactions
    const transactions = await Transaction.find(filter)
      .sort(sortStr)
      .skip(page * limit - limit)
      .limit(limit);

    // If array of transactions doesn't exist or is empty
    if (!transactions || transactions.length === 0) {
      throw Error;
    }

    return transactions;
  } catch (err) {
    if (err.message) {
      console.log(`[FIND_ALL_TRANSACTION] ${err.message}`);
    }

    throw new errors.NotFoundError(
      `Something went wrong. Your requested resource is empty or doesn't exist`
    );
  }
};

module.exports = { findAll };
