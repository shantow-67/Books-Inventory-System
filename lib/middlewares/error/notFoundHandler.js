const { errors } = require("../../../errors");

const notFoundHandler = (req, res, next) => {
  const notFound = new errors.NotFoundError(`Requested route doesn't exist`);

  next(notFound);
};

module.exports = { notFoundHandler };
