const connection = require("../db");

function index(req, res) {
  // GEtting PARAMS
  const { category, sort, available, featured, price } = req.query;
  const realPrice = parseInt(price);
  let sqlProduct =
    "SELECT products.*, categories.name AS category_name, categories.slug AS category_slug FROM products LEFT JOIN categories ON products.category_id = categories.id";

  // FILTRI DINAMICI CON COMPONIMENTO QUERY
  let FilterCondition = [];

  //  eventuali prodotti SELECT
  let queryParams = [];

  // Filters
  // Select Category
  if (category) {
    FilterCondition.push(`categories.name = ?`);
    queryParams.push(category);
  }

  // Available Product
  if (available) {
    FilterCondition.push(`stock > 0`);
  }

  // IN EVIDENZA
  if (featured) {
    FilterCondition.push(`is_featured = 1`);
  }
  // slider Prezzo
  if (price) {
    if (realPrice === 150) {
      FilterCondition.push(`products.price < ?`);
      queryParams.push(realPrice);
    }
    if (realPrice === 300) {
      FilterCondition.push(`products.price >= 300 AND products.price < 450`);
      queryParams.push(realPrice);
    }
    if (realPrice === 450) {
      FilterCondition.push(`products.price >= 450 AND products.price < 600`);
      queryParams.push(realPrice);
    }
    if (realPrice === 600) {
      FilterCondition.push(`products.price > ?`);
      queryParams.push(realPrice);
    }
  }

  // CREATING FULL SQL
  if (FilterCondition.length > 0) {
    sqlProduct += " WHERE " + FilterCondition.join(" AND ");
  }

  // SORT FILTERS
  switch (sort) {
    // PRICE
    case "priceUp":
      sqlProduct += " ORDER BY price DESC";
      break;

    case "priceDown":
      sqlProduct += " ORDER BY price ASC";
      break;

    // Più acquisti
    case "acquisti":
      sqlProduct += " ORDER BY sales_count DESC";
      break;

    // ALFABETICO NOME
    case "NameUp":
      sqlProduct += " ORDER BY name DESC";
      break;

    case "NameDown":
      sqlProduct += " ORDER BY name ASC";
      break;

    // Default SORT
    default:
      sqlProduct += " ORDER BY products.id ASC"; // Ordine predefinito
      break;
  }
  connection.query(sqlProduct, queryParams, (err, result) => {
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
      };
    });

    //    sending element
    res.json({
      success: true,
      results: product,
    });
  });
}

// Getting detailed
function show(req, res) {
  paramSlug = req.params.slug;

  const sqlDetailed =
    "SELECT p.*, c.name AS category_name, c.slug AS category_slug FROM dbaudio.products p JOIN dbaudio.categories c ON p.category_id = c.id WHERE p.slug = ?";

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
    console.log([productDetailed]);

    res.json({ result: productDetailed });
  });
}

module.exports = { index, show };
