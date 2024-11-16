const express = require('express');
const router = express.Router();
const { authCheck, adminCheck } = require('../middlewares/authCheck');
const {  } = require('../controllers/order');

router.post('/buy-oder' , authCheck );
router.get('/oders' , authCheck  );

router.get('/history' , authCheck );

module.exports = router;