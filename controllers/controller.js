const connection = require("../db");

function index(req, res) {
  const sqlProduct =
    "SELECT products.*, categories.name AS category_name, categories.slug AS category_slug FROM dbaudio.products LEFT JOIN dbaudio.categories ON products.category_id = categories.id";
  connection.query(sqlProduct, (err, result) => {
    // Negativo
    if (err) {
      console.error("Errore durante il recupero dei prodotti:", err);
      return res.status(500).json({
        success: false,
        message: "Errore interno del server nel recupero dei dati.",
        error: err.message,
      });
    }
    // positivo
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
  paramSlug = req.params.slug;

  const sqlDetailed = "SELECT * FROM products WHERE slug = ?";

  connection.query(sqlDetailed, [paramSlug], (err, result) => {
    if (err) {
      console.error("Errore dei dati");
      return res.status(500).json({
        success: false,
        message: "Errore interno del server nel recupero dei dati.",
        error: err,
      });
    }
    console.log(result);
    const [productDetailed] = result;

    res.json({ result: productDetailed });
  });
}

// getting bestseller
function bestSeller(req, res) {
  const sqlProduct = "SELECT * FROM bestsellers;";
  connection.query(sqlProduct, (err, result) => {
    // Negativo
    if (err) {
      console.error("Errore durante il recupero dei prodotti:", err);
      return res.status(500).json({
        success: false,
        message: "Errore interno del server nel recupero dei dati.",
        error: err.message,
      });
    }
    // positivo
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

module.exports = { index, show, bestSeller };
