const { errors } = require("../../../../errors");
const { userServicesV1 } = require("../../../../lib/v1/user");
const { passwordHash } = require("../../../../utils");
const { tokenServicesV1 } = require("../../../../lib/v1/token");

const register = async ({
  username,
  name,
  email,
  password,
  contactNumber,
  address,
}) => {
  // If essential credentials don't exist
  if (!username || !name || !email || !password || !contactNumber || !address) {
    throw new errors.BadRequestError(`Invalid credentials`);
  }

  // If user already exist
  const isUserExist = await userServicesV1.userExist({ email });
  if (isUserExist) {
    throw new errors.BadRequestError(`User Already Exist`);
  }

  try {
    // Hashing Password
    const encryptedPassword = await passwordHash.generateHash({
      paylod: password,
      saltRound: 10,
    });

    // Create user
    const user = await userServicesV1.create({
      username,
      name,
      email,
      password: encryptedPassword,
      contactNumber,
      address,
    });

    // Generate JWT Token
    const token = await tokenServicesV1.generateTokenForRegister({
      userId: user.id,
      name: user.name,
      role: user.role,
      status: user.status,
    });

    // If token doesn't generate
    if (!token) {
      throw Error;
    }

    // Return final token
    return token;
  } catch (err) {
    if (err.message) {
      console.log(`[REGISTER]: ${err.message}`);
    }
    throw new errors.InternalServerError(`Signup Failed`);
  }
};

module.exports = { register };
