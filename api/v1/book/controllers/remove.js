const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { bookServicesV1 } = require("../../../../lib/v1/book");

const remove = asyncHandler(async (req, res) => {
  const id = req.params.id;

  // Delete book
  const { delCode } = await bookServicesV1.remove({ id });

  res.status(delCode).send();
});

module.exports = { remove };
