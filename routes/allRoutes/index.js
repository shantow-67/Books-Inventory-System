// All routers have been imported
const { authRouter } = require("./authRoutes");
const { bookRouter } = require("./bookRoutes");
const { userRouter } = require("./userRoutes");
const { transactionRouter } = require("./transactionRoutes");

// All routers have been exported
module.exports = { authRouter, bookRouter, userRouter, transactionRouter };
