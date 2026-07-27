const connection = require("../db");

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

//
module.exports = { bestSeller };
