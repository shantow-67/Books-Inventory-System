const { errors } = require("../../../../errors");
const { passwordHash } = require("../../../../utils");
const { tokenServicesV1 } = require("../../../../lib/v1/token");
const { userServicesV1 } = require("../../../../lib/v1/user");
const { StatusCodes } = require("http-status-codes");

const login = async ({ email, password }) => {
  // If email and password doesn't exist
  if (!email || !password) {
    throw new errors.BadRequestError(`Invalid Credentials`);
  }

  try {
    // Find user by email
    const user = await userServicesV1.findUserByEmail({ email });
    // If user doesn't exist
    if (!user) {
      throw new errors.BadRequestError(`Invalid Credentials`);
    }

    // Password verify ~ password valid or not
    const isValidPassword = await passwordHash.compareHash({
      plainTextPassword: password,
      hashPassword: user.password,
    });

    // If password is valid
    if (isValidPassword) {
      // Generate JWT Token
      const token = tokenServicesV1.generateTokenForLogin({
        userId: user.id,
        name: user.name,
        role: user.role,
        status: user.status,
      });

      // return JWT Token
      return token;
    } else {
      throw new errors.BadRequestError(`Invalid Credentials`);
    }
  } catch (err) {
    if (err.message) {
      console.log(`[LOGIN]: ${err.message}`);
    }

    // If error is instance of BadRequestError
    if (err.code === StatusCodes.BAD_REQUEST) {
      throw new errors.BadRequestError(err.message);
    }

    throw new errors.InternalServerError(`Login Failed`);
  }
};

module.exports = { login };
