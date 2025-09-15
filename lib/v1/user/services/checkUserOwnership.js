const { errors } = require("../../../../errors");
const { User } = require("../../../../models");

const checkUserOwnership = async ({ resourceId, userId, role }) => {
  try {
    /**
     * @If_user_is_a_admin
     */
    if (role === "admin") {
      return true;
    }

    /**
     * @If_user_is_not_admin
     */
    // Find user with id
    const user = await User.findOne({ _id: resourceId });

    // If user doesn't exist then throw an error
    if (!user) {
      throw new errors.NotFoundError(`Resource doesn't exist`);
    }

    // If the user Id matches the requested user Id, then return true
    if (user.id === userId) {
      return true;
    }

    return false;
  } catch (err) {
    if (err.message) {
      console.log(`[CHECK_USEER_OWNERSHIP]: ${err.message}`);
    }

    throw new errors.NotFoundError(`Resource doesn't exist`);
  }
};

module.exports = { checkUserOwnership };
