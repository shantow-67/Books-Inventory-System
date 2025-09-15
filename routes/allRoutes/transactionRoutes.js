const transactionRouter = require("express").Router();
const { transactionControllersV1 } = require("../../api/v1/transaction");
const { authMiddleware } = require("../../middlewares");

// Routes
transactionRouter
  .route("/api/v1/transactions")
  .get(
    authMiddleware.authenticate,
    authMiddleware.authorize({ roles: ["admin"] }),
    transactionControllersV1.findAll
  );
transactionRouter
  .route("/api/v1/transactions/:id")
  .get(
    authMiddleware.authenticate,
    authMiddleware.authorize({ roles: ["admin", "librarian", "regular"] }),
    authMiddleware.transactionOwnership({ model: "Transaction" }),
    transactionControllersV1.findSingle
  )
  .delete(
    authMiddleware.authenticate,
    authMiddleware.authorize({ roles: ["admin"] }),
    transactionControllersV1.remove
  );

module.exports = { transactionRouter };
