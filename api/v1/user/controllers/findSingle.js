const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { userServicesV1 } = require("../../../../lib/v1/user");

const findSingle = asyncHandler(async (req, res) => {
  const id = req.params.id;

  // Retrieve a single user
  const user = await userServicesV1.findSingle({ id });

  // Generate Response
  const response = {
    code: StatusCodes.OK,
    message: "User retrieved successfully",
    data: user,
    links: {
      self: req.url,
    },
  };

  res.status(StatusCodes.OK).json(response);
});

module.exports = { findSingle };
