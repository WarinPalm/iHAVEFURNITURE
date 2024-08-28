(function() {
    document.addEventListener("DOMContentLoaded", function() {
        var myBanner = {
            banner1: "/image/hero-image/banner1.jpg",
            banner2: "/image/hero-image/banner2.jpg",
            banner3: "/image/hero-image/banner3.jpg",
            banner4: "/image/hero-image/banner4.jpg"
        };

        // var buttons = document.querySelectorAll(".btn-hero-image button");
        // var prevNextButtons = document.querySelectorAll(".next-prev-btnhero button");

        var heroImage = document.querySelector(".hero-image");
        var currentIndex = 0;
        var direction = 1;
        var autoSlideInterval;

        // การเปลี่ยนภาพ
        function updateImage(index) {
            let bannerKey = Object.keys(myBanner)[index];
            let imageUrl = myBanner[bannerKey];
            heroImage.style.backgroundImage = `url('${imageUrl}')`;
        }

        // อัปเดตสีของปุ่ม
        function updateButtonStyles(index) {
            let buttons = document.querySelectorAll('.btn-banner');
            buttons.forEach(function(button, i) {
                // รีเซ็ตสีของปุ่มทั้งหมด
                button.style.backgroundColor = 'transparent';
                button.style.borderColor = 'white';
                button.style.color = 'white';

                // เปลี่ยนสีปุ่มที่ตรงกับภาพที่แสดงอยู่
                if (i === index) {
                    button.style.backgroundColor = '#ffffff'; // จะเปลี่ยนสีที่ปุ่มเมื่อคลิก
                    button.style.borderColor = '#ffffff';
                    button.style.color = '#ffffff';
                }
            });
        }

        // ฟังก์ชันสำหรับการอัปเดตภาพอัตโนมัติ
        function autoSlide() {
            currentIndex += direction;
            if (currentIndex >= Object.keys(myBanner).length) {
                currentIndex = 0;
            } else if (currentIndex < 0) {
                currentIndex = Object.keys(myBanner).length - 1;
            }
            updateImage(currentIndex);
            updateButtonStyles(currentIndex); // อัปเดตสไตล์ของปุ่ม
        }

        // การจัดการปุ่มเปลี่ยนภาพเมื่อคลิก
        const clicks = document.querySelectorAll('.btn-banner');
        clicks.forEach(function(click, i) {
            click.addEventListener('click', function() {
                updateImage(i);
                currentIndex = i;
                direction = 1; // ตั้งค่าทิศทางเป็นข้างหน้าเสมอเมื่อคลิกเอง

                // รีเซ็ต timer เพื่อรัน autoSlide ใหม่
                clearInterval(autoSlideInterval);
                autoSlideInterval = setInterval(autoSlide, 3000);

                // อัปเดตสีปุ่ม
                updateButtonStyles(i);
            });
        });

        // set default
        updateImage(currentIndex);
        updateButtonStyles(currentIndex); // อัปเดตสีปุ่มเริ่มต้น

        // เริ่มต้นการรัน autoSlide
        autoSlideInterval = setInterval(autoSlide, 3000);

        prevNextButtons.forEach(function(button) {
            button.addEventListener("click", function() {
                if (this.value === "next") {
                    direction = 1; // ไปข้างหน้า
                } else if (this.value === "prev") {
                    direction = -1; // ย้อนกลับ
                }
                autoSlide();

                // รีเซ็ต timer
                clearInterval(autoSlideInterval);
                autoSlideInterval = setInterval(autoSlide, 3000);
            });
        });
    });
})();


// prevNextButtons.forEach(function(button) {
//     button.addEventListener("click", function() {
//         if (this.value === "next") {
//             currentIndex = (currentIndex + 1) % Object.keys(myBanner).length;
//         } else if (this.value === "prev") {
//             currentIndex = (currentIndex - 1 + Object.keys(myBanner).length) % Object.keys(myBanner).length;
//         }
//         updateImage(currentIndex);
//     });
// });