const { errors } = require("../../../../errors");
const { Book } = require("../../../../models");
const defaults = require("../../../../config/defaults");

const findAll = async ({
  page = defaults.page,
  limit = defaults.limit,
  sortType = defaults.sortType,
  sortBy = defaults.sortBy,
  search = defaults.search,
}) => {
  try {
    // Create an essential string/object for sorting & filtering
    const sortStr = `${sortType === "dsc" ? "-" : ""}${sortBy}`;
    const filter = {
      title: { $regex: search, $options: "i" },
    };

    // Find all books
    const books = await Book.find(filter)
      .sort(sortStr)
      .skip(page * limit - limit)
      .limit(limit);

    // If the array of books doesn't exist or is empty
    if (!books || books.length === 0) {
      throw Error;
    }

    // Return the array of books
    return books;
  } catch (err) {
    if (err.message) {
      console.log(`[FIND_ALL_BOOK] ${err.message}`);
    }

    throw new errors.NotFoundError(
      `Something went wrong. Your requested resource is empty or doesn't exist`
    );
  }
};

module.exports = { findAll };
