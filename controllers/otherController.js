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

// searchbar
function searchbar(req, res) {
  // GEtting PARAMS
  const { search } = req.query;

  //
  // IF EMPTY RETURN EMPTY ARRAY
  if (!search || search === "") {
    return res.json({ success: true, results: [] });
  }

  // FORMATTING SEARCH INPUT
  const formattedSearch = search.toLowerCase().trim();
  const fullQuery = `%${formattedSearch}%`;

  // QUERY
  let sqlProduct =
    "SELECT * FROM products WHERE LOWER(products.name) LIKE ? ORDER BY products.name ASC";

  //
  connection.query(sqlProduct, [fullQuery], (err, result) => {
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
    console.log(product);

    res.json({
      success: true,
      results: product,
    });
  });
}
//
module.exports = { bestSeller, searchbar };
