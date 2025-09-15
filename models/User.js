const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide a username"],
      minlength: [6, "Username must be at least 6 characters long"],
      maxlength: [15, "Username can be up to 15 characters long"],
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Please provide a name"],
      minlength: [6, "Name must be at least 6 characters long"],
      maxlength: [30, "Name can be up to 30 characters long"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: [8, "Password must be at least 8 characters long"],
    },
    contactNumber: {
      type: String,
      required: [true, "Please provide a contact number"],
      minlength: [10, "Contact number must be at least 10 characters long"],
      maxlength: [25, "Contact number can be up to 25 characters long"],
    },
    address: {
      type: String,
      required: [true, "Please provide your current address"],
      maxlength: [60, "Address can be up to 60 characters long"],
    },
    role: {
      type: String,
      enum: {
        values: ["admin", "librarian", "regular"],
        message: "{VALUE} is not supported",
      },
      default: "regular",
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "approved", "declined", "blocked"],
        message: "{VALUE} is not supported",
      },
      default: "pending",
    },
    profilePicture: String,
  },
  { timestamps: true, id: true }
);

const User = model("User", userSchema);

module.exports = { User };
