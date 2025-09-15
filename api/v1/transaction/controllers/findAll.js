const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { transactionServicesV1 } = require("../../../../lib/v1/transaction");
const defaults = require("../../../../config/defaults");
const { essentialQuery } = require("../../../../utils");

const findAll = asyncHandler(async (req, res) => {
  // Query Parameters
  const page = req.query.page || defaults.page;
  const limit = req.query.limit || defaults.limit;
  const sortType = req.query.sort_type || defaults.sortType;
  const sortBy = req.query.sort_by || defaults.sortBy;
  const search = req.query.search || defaults.search;
  const userId = req.query.user_id;
  const bookId = req.query.book_id;

  // Retrive all transaction
  const transactions = await transactionServicesV1.findAll({
    page,
    limit,
    sortType,
    sortBy,
    search,
    bookId,
    userId,
  });

  // Pagination
  const totalTransactions = await transactionServicesV1.count({
    search,
    bookId,
    userId,
  });
  const pagination = essentialQuery.getPagination({
    page,
    limit,
    totalItems: totalTransactions,
  });

  // Links
  const links = essentialQuery.getHateOASforAllItems({
    baseUrl: req.url.split("?")[0],
    reqQuery: req.query,
    page,
    hasNext: !!pagination.next,
    hasPrev: !!pagination.prev,
  });

  // Generate Response
  const response = {
    code: StatusCodes.OK,
    message: "Transactions retrieved successfully",
    data: transactions,
    pagination,
    links,
  };

  res.status(StatusCodes.OK).json(response);
});

module.exports = { findAll };
