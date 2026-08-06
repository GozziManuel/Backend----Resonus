const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller.js");
const otherControllers = require("../controllers/otherController.js");
const cartRouter = require("../controllers/otherController.js");

router.get("/", controller.index);

router.get("/:slug", controller.show);

module.exports = router;
