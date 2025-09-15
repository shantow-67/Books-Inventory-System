const { Schema, model } = require("mongoose");

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
      minlength: [10, "Title must be at least 10 characters long"],
      maxlength: [100, "Title can be up to 100 characters long"],
    },
    cover: {
      type: String,
      required: [true, "Please provide a cover image URL"],
    },
    author: {
      type: String,
      required: [true, "Please provide an author name"],
      minlength: [5, "Author name must be at least 5 characters long"],
      maxlength: [30, "Author name can be up to 30 characters long"],
    },
    isbn: {
      type: String,
      required: [true, "Please provide an ISBN"],
      unique: true,
    },
    publicationDate: {
      type: String,
      required: [true, "Please provide a publication date"],
    },
    category: {
      type: String,
      required: [true, "Please provide a category"],
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
      minlength: [20, "Description must be at least 20 characters long"],
      maxlength: [1000, "Description can be up to 1000 characters long"],
    },
    price: {
      type: Number,
      required: [true, "Please provide a price"],
    },
    quantity: {
      type: Number,
      required: [true, "Please provide a quantity"],
    },
    condition: {
      type: String,
      required: [true, "Please provide a condition"],
    },
    availability: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, id: true }
);

const Book = model("Book", bookSchema);

module.exports = { Book };
