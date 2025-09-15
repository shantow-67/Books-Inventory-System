const bookRouter = require("express").Router();
const { bookControllersV1 } = require("../../api/v1/book");
const { authMiddleware } = require("../../middlewares");

// Routes
bookRouter
  .route("/api/v1/books")
  .get(bookControllersV1.findAll)
  .post(
    authMiddleware.authenticate,
    authMiddleware.authorize({ roles: ["admin", "librarian"] }),
    bookControllersV1.create
  );
bookRouter
  .route("/api/v1/books/:id")
  .get(bookControllersV1.findSingle)
  .patch(
    authMiddleware.authenticate,
    authMiddleware.authorize({ roles: ["admin", "librarian"] }),
    bookControllersV1.update
  )
  .delete(
    authMiddleware.authenticate,
    authMiddleware.authorize({ roles: ["admin", "librarian"] }),
    bookControllersV1.remove
  );
// Buy and Borrow routes
bookRouter
  .route("/api/v1/books/buy/:id")
  .post(
    authMiddleware.authenticate,
    authMiddleware.authorize({ roles: ["admin", "librarian", "regular"] }),
    bookControllersV1.buy
  );
bookRouter
  .route("/api/v1/books/borrow/:id")
  .post(
    authMiddleware.authenticate,
    authMiddleware.authorize({ roles: ["admin", "librarian", "regular"] }),
    bookControllersV1.borrow
  );

module.exports = { bookRouter };
