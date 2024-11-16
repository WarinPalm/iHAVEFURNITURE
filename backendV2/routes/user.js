const express = require('express');
const router = express.Router();
const { userData , editProfile } = require('../controllers/user');
const { authCheck, adminCheck } = require('../middlewares/authCheck');


router.get('/user', authCheck , userData);
router.put('/edit-profile' , authCheck , editProfile)

module.exports = router;