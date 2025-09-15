const defaults = require("../../../../config/defaults");
const { User } = require("../../../../models");
const { errors } = require("../../../../errors");

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
      address: { $regex: search, $options: "i" },
    };

    // Find all users
    const users = await User.find(filter)
      .sort(sortStr)
      .skip(page * limit - limit)
      .limit(limit)
      .select("-password");

    // If the array of users doesn't exist or is empty
    if (!users || users.length === 0) {
      throw Error;
    }

    // Return the array of users
    return users;
  } catch (err) {
    if (err.message) {
      console.log(`[FIND_ALL_USER] ${err.message}`);
    }

    throw new errors.NotFoundError(
      `Something went wrong. Your requested resource is empty or doesn't exist`
    );
  }
};

module.exports = { findAll };
