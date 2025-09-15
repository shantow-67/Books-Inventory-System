const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { bookServicesV1 } = require("../../../../lib/v1/book");

const create = asyncHandler(async (req, res) => {
  const {
    title,
    cover,
    author,
    isbn,
    publicationDate,
    category,
    description,
    price,
    quantity,
    condition,
  } = req.body;

  // Create Book
  const book = await bookServicesV1.create({
    title,
    cover,
    author,
    isbn,
    publicationDate,
    category,
    description,
    price,
    quantity,
    condition,
  });

  // Generate Response
  const response = {
    code: StatusCodes.CREATED,
    message: "Book created successfully",
    data: book,
    links: {
      self: `${req.url}/${book.id}`,
    },
  };

  res.status(StatusCodes.CREATED).json(response);
});

module.exports = { create };
