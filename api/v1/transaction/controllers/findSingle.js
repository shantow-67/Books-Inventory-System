const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { transactionServicesV1 } = require("../../../../lib/v1/transaction");

const findSingle = asyncHandler(async (req, res) => {
  const id = req.params.id;

  // Retrive singel transaction
  const transaction = await transactionServicesV1.findSingle({ id });

  // Generate Response
  const response = {
    code: StatusCodes.OK,
    message: "Transaction retrieved successfully",
    data: transaction,
    links: {
      self: req.url,
    },
  };

  res.status(StatusCodes.OK).json(response);
});

module.exports = { findSingle };
