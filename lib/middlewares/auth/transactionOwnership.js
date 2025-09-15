const { transactionServicesV1 } = require("../../v1/transaction");
const { errors } = require("../../../errors");

const transactionOwnership =
  ({ model = "" }) =>
  async (req, res, next) => {
    const {
      params: { id },
      user: { userId, role },
    } = req;

    try {
      // If model is equal to Transaction
      if (model === "Transaction") {
        const isOwner = await transactionServicesV1.checkTransactionOwnership({
          resourceId: id,
          userId,
          role,
        });

        // If isOwner is true then trun to next step
        if (isOwner) {
          return next();
        }
      }

      // Otherwise throw error
      return next(new errors.AuthorizationError("Ownership Failed"));
    } catch (err) {
      return next(err);
    }
  };

module.exports = { transactionOwnership };
