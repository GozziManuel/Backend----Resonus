const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller.js");
const otherControllers = require("../controllers/otherController.js");

// bestsllers
router.get("/bestSeller", otherControllers.bestSeller);

router.get("/", otherControllers.searchbar);

// router.post("/:id/", );

module.exports = router;
