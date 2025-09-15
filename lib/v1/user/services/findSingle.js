const { User } = require("../../../../models");
const { errors } = require("../../../../errors");

const findSingle = async ({ id }) => {
  // If id doesn't pass then throw BadRequestError
  if (!id) {
    throw new errors.BadRequestError(`Invalid Credentials`);
  }

  try {
    // Find single user
    const user = await User.findOne({ _id: id }).select("-password");

    // If user doesn't exist
    if (!user) {
      throw Error;
    }

    return user;
  } catch (err) {
    if (err.message) {
      console.log(`[FIND_SINGLE_USER] ${err.message}`);
    }

    throw new errors.NotFoundError(`Requested resource not found`);
  }
};

module.exports = { findSingle };
