const express = require("express");
const morgan = require("morgan");
const path = require("path");
const OpenApiValidator = require("express-openapi-validator");
const swaggerUI = require("swagger-ui-express");
const Yaml = require("yamljs");
const swaggerDoc = Yaml.load(
  path.join(__dirname, "../booksInventorySystem.yaml")
);

// Create applyMiddleware function
const applyMiddleware = (app) => {
  app.use(express.json());
  app.use(morgan("dev"));
  app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));
  app.use(
    OpenApiValidator.middleware({
      apiSpec: path.join(__dirname, "../booksInventorySystem.yaml"),
    })
  );
};

module.exports = { applyMiddleware };
