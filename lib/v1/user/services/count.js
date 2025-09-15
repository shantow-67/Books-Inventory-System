const { User } = require("../../../../models");

const count = async ({ search = "" }) => {
  const filter = {
    address: { $regex: search, $options: "i" },
  };

  // How many users exist in the database
  const totalItems = await User.count(filter);

  return totalItems;
};

module.exports = { count };
