const express = require("express");
const cors = require("cors");
const router = require("./routers/router");
const otherRouters = require("./routers/otherRouters");
const app = express();
const port = 3000;

// Cors
app.use(cors());

// images
app.use(express.static("public"));

// body parser
app.use(express.json());

// Rotta base
app.get("/", (req, res) => {
  res.send("Resonus /// Main ");
});

// router
app.use("/products", router);
app.use("/product", otherRouters);

// Listen
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
