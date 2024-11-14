// import ....
const express = require('express');
const router = express.Router(); //สร้าง router object
const { create , getAll ,update , remove } = require('../controllers/product'); // import register function จาก controllers/auth.js
const { authCheck, adminCheck } = require('../middlewares/authCheck'); // import authCheck function จาก middlewares/authCheck.js
const upload = require('../middlewares/upload');

// Endpoints
router.post('/product' , upload.single('picture') ,authCheck , adminCheck , create) // สร้าง endpoint สำหรับการสร้างผู้ใช้งาน
router.get('/products', getAll)
router.put('/product-edit/:id', upload.single('picture'), authCheck , adminCheck, update)
router.delete('/product-del/:id', remove)




module.exports = router; // export router object ออกไปให้ server.js ไปใช้งานได้