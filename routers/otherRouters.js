const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller.js");
const controllerFilter = require("../controllers/filterController.js");

// bestsllers
router.get("/bestSeller", controllerFilter.bestSeller);

// router.post("/:id/", );

module.exports = router;
