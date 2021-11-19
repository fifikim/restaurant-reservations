/**
 * Defines the router for table resources.
 *
 * @type {Router}
 */

const router = require("express").Router();
const controller = require("./tables.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
  .route("/:table_id")
  .put(controller.update)
  .get(controller.read)
  .delete(controller.delete)
  .all(methodNotAllowed);

router
  .route("/")
  .get(controller.list)
  .get(controller.read)
  .post(controller.create)
  .all(methodNotAllowed);

module.exports = router;
