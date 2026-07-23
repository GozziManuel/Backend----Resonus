const express = require("express");
const app = express();
const port = 3000;

// Rotta base
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Listen
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
