const express = require('express');
const router = express.Router();

// Località fisse (esempio: principali città italiane)
const localita = [
  "Milano",
  "Roma",
  "Torino",
  "Napoli",
  "Bologna",
  "Firenze",
  "Venezia",
  "Palermo",
  "Genova",
  "Verona"
];

// GET /api/localita
router.get('/', (req, res) => {
  res.json(localita);
});

module.exports = router;
