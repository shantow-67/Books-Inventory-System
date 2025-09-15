const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { bookServicesV1 } = require("../../../../lib/v1/book");

const update = asyncHandler(async (req, res) => {
  const id = req.params.id;

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
    availability,
  } = req.body;

  // payload
  const payload = {
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
    availability,
  };

  // Updated Book
  const updatedBook = await bookServicesV1.update({ id, payload });

  // Generate Response
  const response = {
    code: StatusCodes.OK,
    message: "Book updated successfully",
    data: updatedBook,
    links: {
      self: req.url,
    },
  };

  res.status(StatusCodes.OK).json(response);
});

module.exports = { update };
