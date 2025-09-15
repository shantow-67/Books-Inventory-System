const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { bookServicesV1 } = require("../../../../lib/v1/book");

const buy = asyncHandler(async (req, res) => {
  const {
    params: { id },
    user: { userId },
  } = req;

  const { quantity } = req.body;

  // Book buying information
  const buyingData = await bookServicesV1.buy({ id, userId, quantity });

  // Generate response
  const response = {
    code: StatusCodes.CREATED,
    message: "Book purchase successful, and a new transaction has been created",
    data: buyingData,
    links: {
      self: req.url,
    },
  };

  res.status(StatusCodes.OK).json(response);
});

module.exports = { buy };
