const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { authServicesV1 } = require("../../../../lib/v1/authentication");

const register = asyncHandler(async (req, res) => {
  const { username, name, email, password, contactNumber, address } = req.body;

  // Create account and generate Token
  const token = await authServicesV1.register({
    username,
    name,
    email,
    password,
    contactNumber,
    address,
  });

  // Generate response
  const response = {
    code: StatusCodes.CREATED,
    message: "Account created successfully",
    data: {
      access_token: token,
    },
    links: {
      self: req.url,
      login: req.url.replace("register", "login"),
    },
  };

  res.status(StatusCodes.CREATED).json(response);
});

module.exports = { register };
