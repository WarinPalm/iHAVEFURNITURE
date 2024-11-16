const express = require('express');
const router = express.Router();
const { authCheck, adminCheck } = require('../middlewares/authCheck');
const {  } = require('../controllers/admin');

router.post('/change-statusOrder' , authCheck , adminCheck );
router.get('/oders' , authCheck , adminCheck );

module.exports = router;