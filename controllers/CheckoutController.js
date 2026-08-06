function checkout(req, res) {
  const {
    nome,
    cognome,
    email,
    indirizzo,
    cap,
    paese,
    citta,
    payment,
    intestatario,
    cartNumber,
    scadenza,
    cvv,
    ciao,
  } = req.body;

  const emptyinputs = [];

  if (nome.trim() === "") {
    emptyinputs.push("nome");
  }
  if (cognome.trim() === "") {
    emptyinputs.push("cognome");
  }
  if (email.trim() === "") {
    emptyinputs.push("email");
  }
  if (indirizzo.trim() === "") {
    emptyinputs.push("indirizzo");
  }
  if (cap.trim() === "") {
    emptyinputs.push("CAP");
  }
  if (paese.trim() === "") {
    emptyinputs.push("paese");
  }
  if (citta.trim() === "") {
    emptyinputs.push("città");
  }
  if (payment.trim() === "") {
    emptyinputs.push("payment");
  }
  if (intestatario.trim() === "") {
    emptyinputs.push("Intestatario");
  }
  if (cartNumber.trim() === "") {
    emptyinputs.push("Numero Carta");
  }
  if (scadenza.trim() === "") {
    emptyinputs.push("Scadenza");
  }

  if (cvv.trim() === "") {
    emptyinputs.push("CVV");
  }

  if (emptyinputs.length !== 0) {
    console.log(emptyinputs);

    console.error("Errore input vuoto");
    return res.status(500).json({
      success: false,
      message: `Input ${emptyinputs.map((el) => el).join(", ")} ${emptyinputs.length > 1 ? "vuoti" : "vuoto"} ricontrolla!`,
    });
  }

  //   if ("") {
  //     console.error("Errore dei dati");
  //     return res.status(500).json({
  //       success: false,
  //       message: "Errore interno del server nel recupero dei dati.",
  //       error: err,
  //     });
  //   }
  //   if ("") {
  //     console.error("Errore dei dati");
  //     return res.status(500).json({
  //       success: false,
  //       message: "Errore interno del server nel recupero dei dati.",
  //       error: err,
  //     });
  //   }
  //   if ("") {
  //     console.error("Errore dei dati");
  //     return res.status(500).json({
  //       success: false,
  //       message: "Errore interno del server nel recupero dei dati.",
  //       error: err,
  //     });
  //   }

  res.json({ result: "success" });
}

module.exports = { checkout };
