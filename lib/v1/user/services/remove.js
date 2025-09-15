const { User } = require("../../../../models");
const { errors } = require("../../../../errors");
const { StatusCodes } = require("http-status-codes");

const remove = async ({ id }) => {
  // If id doesn't pass then throw BadRequestError
  if (!id) {
    throw new errors.BadRequestError(`Invalid Credentials`);
  }

  try {
    // Delete user
    const user = await User.findOneAndDelete({ _id: id });

    // If user doesn't exist
    if (!user) {
      throw new errors.NotFoundError(`Requested resource not found`);
    }

    // If the user is deleted successfully, then return a delCode.
    return { delCode: 204 };
  } catch (err) {
    if (err.message) {
      console.log(`[REMOVE_USER] ${err.message}`);
    }

    // If error is instance of NotFoundError
    if (err.code === StatusCodes.NOT_FOUND) {
      throw new errors.NotFoundError(err.message);
    }

    throw new errors.InternalServerError(`Article Deletion Failed`);
  }
};

module.exports = { remove };
