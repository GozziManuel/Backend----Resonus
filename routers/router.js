const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller.js");

router.get("/", controller.index);

router.get("/:id", controller.show);

// router.post("/:id/", );

module.exports = router;
