const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { transactionServicesV1 } = require("../../../../lib/v1/transaction");

const remove = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const { delCode } = await transactionServicesV1.remove({ id });

  res.status(delCode).send();
});

module.exports = { remove };
