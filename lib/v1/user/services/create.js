const { User } = require("../../../../models");
const { errors } = require("../../../../errors");

const create = async ({
  username,
  name,
  email,
  password,
  contactNumber,
  address,
}) => {
  // If any of the essential user information is missing, then it will throw a BadRequestError.
  if (!username || !name || !email || !password || !contactNumber || !address) {
    throw new errors.BadRequestError(`Invalid Credentials`);
  }

  try {
    // Create new user
    const user = new User({
      username,
      name,
      email,
      password,
      contactNumber,
      address,
    });
    await user.save();

    // If new user doesn't create
    if (!user) {
      throw Error;
    }

    return user;
  } catch (err) {
    if (err.message) {
      console.log(`[CREATE_USER]: ${err.message}`);
    }

    throw new errors.InternalServerError(`User Creation Failed`);
  }
};

module.exports = { create };
