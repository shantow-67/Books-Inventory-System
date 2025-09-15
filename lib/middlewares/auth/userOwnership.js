const { userServicesV1 } = require("../../v1/user");
const { errors } = require("../../../errors");

// userOwnership function returns another function that is a middleware
const userOwnership =
  ({ model = "" }) =>
  async (req, res, next) => {
    const {
      params: { id },
      user: { userId, role },
    } = req;

    try {
      // If model is equal to User Modle
      if (model === "User") {
        const isOwner = await userServicesV1.checkUserOwnership({
          resourceId: id,
          userId,
          role,
        });

        // If isOwner is true then trun to next step
        if (isOwner) {
          return next();
        }
      }

      // Otherwise throw error
      return next(new errors.AuthorizationError("Ownership Failed"));
    } catch (err) {
      next(err);
    }
  };

module.exports = { userOwnership };
