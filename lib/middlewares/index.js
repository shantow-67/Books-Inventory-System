// All middlewares have been imported
const { applyMiddleware } = require("./applyMiddleware");
const errorMiddleware = require("./error");
const authMiddleware = require("./auth");

// All middlewares have been exported
module.exports = { applyMiddleware, errorMiddleware, authMiddleware };
