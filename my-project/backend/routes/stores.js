const express = require('express');
const { getStores } = require('../data/loadData');
const router = express.Router();

router.get('/', (req, res) => {
  const stores = getStores();
  res.json(stores);
});

module.exports = router;
