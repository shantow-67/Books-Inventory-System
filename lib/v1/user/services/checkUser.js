const { User } = require("../../../../models");

// Find user by email
const findUserByEmail = async ({ email }) => {
  const user = await User.findOne({ email });
  return user ? user : false;
};

// Find user by id
const findUserById = async ({ id }) => {
  const user = await User.findOne({ _id: id });
  return user ? user : false;
};

const userExist = async ({ email = undefined, id = undefined }) => {
  // Check with email
  if (email) {
    const user = await findUserByEmail({ email });
    return user ? true : false;
  }

  // Check with id
  if (id) {
    const user = await findUserById({ id });
    return user ? true : false;
  }
};

module.exports = { findUserByEmail, findUserById, userExist };
