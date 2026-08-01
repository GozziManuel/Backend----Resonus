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

    res.json({
      success: true,
      results: product,
    });
  });
}

// ************ ADDING TO CART
function Cart(req, res) {
  // GEtting PARAMS
  const {
    id,
    sku,
    name,
    slug,
    category_id,
    price,
    stock,
    sales_count,
    is_featured,
    image_url,
    second_image,
    third_image,
    description,
    specs,
    presets_config,
    hotspots,
  } = req.body;
  const quantity = req.body.quantity ?? 1;
  //
  if (!req.body) {
    return res.status(500).json({
      success: false,
      message: "body non esistente",
    });
  }

  // QUERY
  let sqlProduct =
    "INSERT INTO cart_items ( id, sku, name, slug, category_id, price, stock, sales_count, is_featured, image_url, second_image, third_image, description, quantity ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE quantity = GREATEST(1, quantity + VALUES(quantity));";

  //
  connection.query(
    sqlProduct,
    [
      id,
      sku,
      name,
      slug,
      category_id,
      price,
      stock,
      sales_count,
      is_featured,
      image_url,
      second_image,
      third_image,
      description,
      quantity,
    ],
    (err, result) => {
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

      res.json({
        success: true,
        results: result,
      });
    },
  );
}

//  ********************* getting CartProduct
function cartProduct(req, res) {
  const sqlProduct = "SELECT * FROM cart_items;";
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

//  ********************* removing CartProduct
function RemoveCartProduct(req, res) {
  paramSlug = req.params.slug;

  // Removing Item
  const sqlRemove = "DELETE FROM cart_items WHERE slug = ?";
  connection.query(sqlRemove, [paramSlug], (err, result) => {
    // Negativo
    if (err) {
      console.error("Errore durante il recupero dei prodotti:", err);
      return res.status(500).json({
        success: false,
        message: "Errore interno del server nel recupero dei dati.",
        error: err.message,
      });
    }

    // Getting Refreshed Product List
    const sqlProduct = "SELECT * FROM cart_items";

    connection.query(sqlProduct, (err, result) => {
      res.json({
        success: true,
        results: result,
      });
    });
  });
}
//
module.exports = {
  bestSeller,
  searchbar,
  Cart,
  cartProduct,
  RemoveCartProduct,
};
