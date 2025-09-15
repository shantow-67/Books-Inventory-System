const userRouter = require("express").Router();
const { userControllersV1 } = require("../../api/v1/user");
const { authMiddleware } = require("../../middlewares");

// Routes
userRouter
  .route("/api/v1/users")
  .get(
    authMiddleware.authenticate,
    authMiddleware.authorize({ roles: ["admin"] }),
    userControllersV1.findAll
  );

userRouter
  .route("/api/v1/users/:id")
  .get(
    authMiddleware.authenticate,
    authMiddleware.authorize({ roles: ["admin", "librarian", "regular"] }),
    authMiddleware.userOwnership({ model: "User" }),
    userControllersV1.findSingle
  )
  .patch(
    authMiddleware.authenticate,
    authMiddleware.authorize({ roles: ["admin", "librarian", "regular"] }),
    authMiddleware.userOwnership({ model: "User" }),
    userControllersV1.update
  )
  .delete(
    authMiddleware.authenticate,
    authMiddleware.authorize({ roles: ["admin", "librarian", "regular"] }),
    authMiddleware.userOwnership({ model: "User" }),
    userControllersV1.remove
  );

module.exports = { userRouter };
