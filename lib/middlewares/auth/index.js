// All authentication and authorization middlewares have been imported
const { authenticate } = require("./authenticate");
const { authorize } = require("./authorize");
const { userOwnership } = require("./userOwnership");
const { transactionOwnership } = require("./transactionOwnership");

// All authentication and authorization middleware have been exported
module.exports = {
  authenticate,
  authorize,
  userOwnership,
  transactionOwnership,
};
