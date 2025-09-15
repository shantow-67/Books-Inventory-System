// All book controllers have been imported.
const { borrow } = require("./borrow");
const { buy } = require("./buy");
const { create } = require("./create");
const { findAll } = require("./findAll");
const { findSingle } = require("./findSingle");
const { remove } = require("./remove");
const { update } = require("./update");

// All book controllers have been exported.
module.exports = { borrow, buy, create, findAll, findSingle, remove, update };
