const express = require('express');
const router = express.Router();

// Località fisse (esempio: principali città italiane)
const localita = [
  "Trento Nord",
  "Trento Centro",
  "Trento Sud",
  "Povo collina",
  "Mesiano"
];

// GET /api/localita
router.get('/', (req, res) => {
  res.json(localita);
});

module.exports = router;
