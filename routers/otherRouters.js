const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller.js");
const otherControllers = require("../controllers/otherController.js");
const checkoutController = require("../controllers/CheckoutController.js");

router.get("/", otherControllers.searchbar);

// form checkout
router.post("/checkout", checkoutController.checkout);

module.exports = router;
