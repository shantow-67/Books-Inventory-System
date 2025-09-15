const { errors } = require("../../../../errors");
const { findSingle } = require("./findSingle"); //Find Transaction

const checkTransactionOwnership = async ({ resourceId, userId, role }) => {
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
    // Find transaction by id
    const transaction = await findSingle({ id: resourceId });

    // If transaction is doesn't exist
    if (!transaction) {
      throw Error;
    }

    // If the userId that is inside the transaction matches the requested userId
    if (transaction.userId.toString() === userId) {
      return true;
    }

    return false;
  } catch (err) {
    if (err.message) {
      console.log(`[CHECK_TRANSACTION_OWNERSHIP]: ${err.message}`);
    }

    throw new errors.NotFoundError(`Resource doesn't exist`);
  }
};

module.exports = { checkTransactionOwnership };
