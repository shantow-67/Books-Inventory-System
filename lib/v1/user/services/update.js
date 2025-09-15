const { User } = require("../../../../models");
const { errors } = require("../../../../errors");
const { StatusCodes } = require("http-status-codes");
const { passwordHash } = require("../../../../utils");

const update = async ({
  id,
  superUser,
  name,
  password,
  contactNumber,
  address,
  profilePicture,
  role,
  status,
}) => {
  const updateQuery = {};
  // Regular user can only update non-sensitive fields
  if (name) {
    updateQuery.name = name;
  }
  // Changed password must be hashed before store in the DataBase
  if (password) {
    // Hashing Password
    const encryptedPassword = await passwordHash.generateHash({
      paylod: password,
      saltRound: 10,
    });

    updateQuery.password = encryptedPassword;
  }
  if (contactNumber) {
    updateQuery.contactNumber = contactNumber;
  }
  if (address) {
    updateQuery.address = address;
  }
  if (profilePicture) {
    updateQuery.profilePicture = profilePicture;
  }

  // Only admin can update to sensitive fields (role, status).
  if (superUser === "admin") {
    if (role) {
      updateQuery.role = role;
    }
    if (status) {
      updateQuery.status = status;
    }
  }

  try {
    // Update user
    const user = await User.findOneAndUpdate({ _id: id }, updateQuery, {
      new: true,
      runValidators: true,
    });

    // If user doesn't exist
    if (!user) {
      throw new errors.NotFoundError(`Requested resource not found`);
    }

    // Return final updated user
    return user;
  } catch (err) {
    if (err.message) {
      console.log(`[UPDATE_USER]: ${err.message}`);
    }

    // If error is instance of NotFoundError
    if (err.code === StatusCodes.NOT_FOUND) {
      throw new errors.NotFoundError(err.message);
    }

    throw new errors.InternalServerError(`User Update Failed`);
  }
};

module.exports = { update };
