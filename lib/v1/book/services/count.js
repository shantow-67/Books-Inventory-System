const { Book } = require("../../../../models");

const count = async ({ search = "" }) => {
  const filter = {
    title: { $regex: search, $options: "i" },
  };

  // How many books exist in the database
  const totalItems = await Book.count(filter);

  return totalItems;
};

module.exports = { count };
