const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { userServicesV1 } = require("../../../../lib/v1/user");

const remove = asyncHandler(async (req, res) => {
  const id = req.params.id;

  // Delete user
  const { delCode } = await userServicesV1.remove({ id });

  res.status(delCode).send();
});

module.exports = { remove };
