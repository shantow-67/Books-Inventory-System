const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { bookServicesV1 } = require("../../../../lib/v1/book");

const borrow = asyncHandler(async (req, res) => {
  const {
    params: { id },
    user: { userId },
  } = req;

  const { quantity } = req.body;

  // Book Borrowing Information
  const borrowingData = await bookServicesV1.borrow({ id, userId, quantity });

  // Generate Response
  const response = {
    code: StatusCodes.CREATED,
    message: "Book borrow successful, and a new transaction has been created",
    data: borrowingData,
    links: {
      self: req.url,
    },
  };

  res.status(StatusCodes.CREATED).json(response);
});

module.exports = { borrow };
