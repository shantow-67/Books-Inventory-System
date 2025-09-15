const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { bookServicesV1 } = require("../../../../lib/v1/book");
const defaults = require("../../../../config/defaults");
const { essentialQuery } = require("../../../../utils");

const findAll = asyncHandler(async (req, res) => {
  // Query Parameters
  const page = req.query.page || defaults.page;
  const limit = req.query.limit || defaults.limit;
  const sortType = req.query.sort_type || defaults.sortType;
  const sortBy = req.query.sort_by || defaults.sortBy;
  const search = req.query.search || defaults.search;

  // Retrive all books
  const books = await bookServicesV1.findAll({
    page,
    limit,
    sortType,
    sortBy,
    search,
  });

  // Pagination
  const totalBooks = await bookServicesV1.count({ search });
  const pagination = essentialQuery.getPagination({
    page,
    limit,
    totalItems: totalBooks,
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
    message: "Books retrieved successfully",
    data: books,
    pagination,
    links,
  };

  res.status(StatusCodes.OK).json(response);
});

module.exports = { findAll };
