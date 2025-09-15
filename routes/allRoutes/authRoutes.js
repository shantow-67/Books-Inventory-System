const authRouter = require("express").Router();
const { authControllersV1 } = require("../../api/v1/authentication");

// Routes
authRouter.route("/api/v1/auth/register").post(authControllersV1.register);
authRouter.route("/api/v1/auth/login").post(authControllersV1.login);

// Export authRouter
module.exports = { authRouter };
