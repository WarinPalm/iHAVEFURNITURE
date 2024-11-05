const express = require('express');
const router = express.Router();
// Controller
const { create, list, listAll , read, update , remove, listby, searchFilters } = require('../controllers/product');

// @Endpoint: GET localhost:3000/api/products
router.post('/product', create)
router.get('/products/:count', list)
router.get('/products', listAll)
router.get('/product/:id', read)
router.put('/product/:id', update)
router.delete('/product/:id', remove)
router.post('/productby',listby)
router.post('/search/filters',searchFilters)


module.exports = router;