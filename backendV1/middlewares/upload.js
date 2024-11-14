const multer = require('multer');
const path = require('path');
const fs = require('fs');

// ตรวจสอบและสร้างโฟลเดอร์ถ้าไม่มีอยู่
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true }); // สร้างโฟลเดอร์ 'uploads' ถ้ายังไม่มี
}

// ตั้งค่าที่เก็บไฟล์และการตั้งชื่อไฟล์
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // ที่เก็บไฟล์ (เช่นโฟลเดอร์ 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // ตั้งชื่อไฟล์ใหม่
    }
});

// สร้างตัวกลางสำหรับ multer
const upload = multer({ storage: storage });

module.exports = upload;
