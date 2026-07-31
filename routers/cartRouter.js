const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller.js");
const otherControllers = require("../controllers/otherController.js");

router.get("/cartitems", otherControllers.cartProduct);

router.post("/addToCart", otherControllers.Cart);

// router.post("/:id/", );

module.exports = router;
