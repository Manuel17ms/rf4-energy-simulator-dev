const express = require('express');
const router = express.Router();

const localita = [
  { id: 'loc1', name: 'Piedicastello', climateFactor: 1.2 },
  { id: 'loc2', name: 'Madonna Bianca', climateFactor: 1.1 },
  { id: 'loc3', name: 'Solteri', climateFactor: 1.3 },
  { id: 'loc4', name: 'Melta', climateFactor: 1.2 },
  { id: 'loc5', name: 'Villazzano Tre', climateFactor: 1.1 },
  { id: 'loc6', name: 'Cristo Re', climateFactor: 1.3 },
  { id: 'loc7', name: 'San Bartolomeo', climateFactor: 1.4 },
  { id: 'loc8', name: 'San Giuseppe', climateFactor: 1.0 }
];

// API
router.get(['/locations', '/localita', '/'], (req, res) => {
  res.json(localita);
});

// 🔹 EXPORT DATI PER ALTRI ROUTER
module.exports = {
  router,
  localita
};
