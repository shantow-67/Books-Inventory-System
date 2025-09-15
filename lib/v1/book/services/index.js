// All book services have been imported.
const { borrow } = require("./borrow");
const { buy } = require("./buy");
const { create } = require("./create");
const { findAll } = require("./findAll");
const { findSingle } = require("./findSingle");
const { remove } = require("./remove");
const { update } = require("./update");
const { count } = require("./count");

// All book services have been exported.
module.exports = {
  borrow,
  buy,
  create,
  findAll,
  findSingle,
  remove,
  update,
  count,
};
