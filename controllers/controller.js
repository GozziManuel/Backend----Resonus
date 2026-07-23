const connection = require("../db");

function index(req, res) {
  const sqlProduct = "SELECT * FROM products;";
  connection.query(sqlProduct, (err, result) => {
    const product = result.map((el) => {
      return {
        ...el,
        // image: `http://localhost:3000/${el.image}`,
      };
    });
    res.json({
      success: true,
      results: product,
    });
  });
}

// Getting detailed
function show(req, res) {
  paramId = parseInt(req.params.id);

  const sqlDetailed = "SELECT * FROM products WHERE id = ?";

  connection.query(sqlDetailed, [paramId], (err, result) => {
    console.log(result);
    const [productDetailed] = result;

    res.json({ result: productDetailed });
  });
}
// function --(req, res) {

// }
module.exports = { index, show };
