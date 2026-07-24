const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller.js");

router.get("/bestSeller", controller.bestSeller);

// router.post("/:id/", );

module.exports = router;
