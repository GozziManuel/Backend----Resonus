const express = require("express");
const app = express();
const port = 3000;

// Rotta base
app.get("/", (req, res) => {
  res.send("Resonus /// Main ");
});

// router
const router = require("./routers/router");
app.use("/products", router);

// Public
app.use(express.static("public"));

// Listen
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
