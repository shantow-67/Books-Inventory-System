const { Schema, model } = require("mongoose");

const transactionSchema = new Schema(
  {
    action: {
      type: String,
      enum: {
        values: ["purchase", "borrow"],
        message: "{VALUE} is not supported",
      },
      required: [true, "Please specify an action (purchase or borrow)"],
    },
    bookId: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    transactionDate: {
      type: Date,
      default: Date.now,
    },
    returnDate: {
      type: Date,
    },
    bookPrice: {
      type: Number,
      required: [true, "Please provide the book price"],
    },
    quantity: {
      type: Number,
      required: [true, "Please provide the quantity of books"],
    },
    totalCost: {
      type: Number,
      required: [true, "Please provide the total cost"],
    },
  },
  { timestamps: true, id: true }
);

const Transaction = model("Transaction", transactionSchema);

module.exports = { Transaction };
