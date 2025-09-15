const bcrypt = require("bcrypt");
const { errors } = require("../../errors");

// Plain text password to hash password
const generateHash = async ({ paylod, saltRound = 10 }) => {
  try {
    const hashPassword = await bcrypt.hash(paylod, saltRound);

    return hashPassword;
  } catch (err) {
    if (err.message) {
      console.log(`[HASH_PASSWORD] ${err.message}`);
    }

    throw new errors.InternalServerError(`Password Hashing Failed`);
  }
};

// Compare password ~ password valid or not
const compareHash = async ({ plainTextPassword, hashPassword }) => {
  try {
    const isMatch = await bcrypt.compare(plainTextPassword, hashPassword);

    return isMatch;
  } catch (err) {
    if (err.message) {
      console.log(`[COMPARE_PASSWORD] ${err.message}`);
    }

    throw new errors.InternalServerError(`Password Compare Failed`);
  }
};

module.exports = { generateHash, compareHash };
