const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { userServicesV1 } = require("../../../../lib/v1/user");

const update = asyncHandler(async (req, res) => {
  const {
    params: { id },
    user: { role: superUser },
  } = req;

  const {
    name,
    password,
    contactNumber,
    address,
    profilePicture,
    role,
    status,
  } = req.body;

  // Updated User
  const updatedUser = await userServicesV1.update({
    id,
    superUser,
    name,
    password,
    contactNumber,
    address,
    profilePicture,
    role,
    status,
  });

  // Generate Response
  const response = {
    code: StatusCodes.OK,
    message: "User updated successfully",
    data: updatedUser,
    links: {
      self: `${req.url}/${updatedUser.id}`,
    },
  };

  res.status(StatusCodes.OK).json(response);
});

module.exports = { update };
