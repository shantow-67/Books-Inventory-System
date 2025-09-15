// All user controllers have been imported.
const { findAll } = require("./findAll");
const { findSingle } = require("./findSingle");
const { remove } = require("./remove");
const { update } = require("./update");

// All user controllers have been exported.
module.exports = { findAll, findSingle, remove, update };
