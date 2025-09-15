const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { bookServicesV1 } = require("../../../../lib/v1/book");

const findSingle = asyncHandler(async (req, res) => {
  const id = req.params.id;

  // Retrive Single Book
  const book = await bookServicesV1.findSingle({ id });

  // Generate Response
  const response = {
    code: StatusCodes.OK,
    message: "Book retrieved successfully",
    data: book,
    links: {
      self: req.url,
    },
  };

  res.status(StatusCodes.OK).json(response);
});

module.exports = { findSingle };
