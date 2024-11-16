const express = require('express');
const router = express.Router();
const { addItemToCart ,listItemCart , removeItemCart} = require('../controllers/cart');
const { authCheck } = require('../middlewares/authCheck');



router.post('/item-cart' , authCheck , addItemToCart)
router.get('/cart' , authCheck , listItemCart)
router.delete('/item-cart/:id' , authCheck ,   removeItemCart)


module.exports = router;