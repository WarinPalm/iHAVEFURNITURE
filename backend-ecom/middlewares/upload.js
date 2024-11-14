const multer = require('multer');
const path = require('path');

// ตั้งค่าที่เก็บไฟล์และการตั้งชื่อไฟล์
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads'); // ที่เก็บไฟล์ (เช่นโฟลเดอร์ 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // ตั้งชื่อไฟล์ใหม่
    }
});

// สร้างตัวกลางสำหรับ multer
const upload = multer({ storage: storage });

module.exports = upload;
