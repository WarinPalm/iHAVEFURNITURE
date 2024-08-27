(function() {
    document.addEventListener("DOMContentLoaded", function() {
        var myBanner = [{
            banner1: "/image/hero-image/banner1.jpg",
            banner2: "/image/hero-image/banner2.jpg",
            banner3: "/image/hero-image/banner3.jpg",
            banner4: "/image/hero-image/banner4.jpg"
        }];

        var buttons = document.querySelectorAll(".btn-hero-image button");
        var prevNextButtons = document.querySelectorAll(".next-prev-btnhero button");
        
        var heroImage = document.querySelector(".hero-image");
        var currentIndex = 0;

        // ฟังก์ชันสำหรับการเปลี่ยนภาพ
        function updateImage(index) {
            var bannerKey = Object.keys(myBanner)[index];
            var imageUrl = myBanner[bannerKey];
            heroImage.style.backgroundImage = `url('${imageUrl}')`;
        }

        // การจัดการปุ่มเปลี่ยนภาพ
        buttons.forEach(function(button) {
            button.addEventListener("click", function() {
                var bannerValue = this.value;
                var index = Object.keys(myBanner).indexOf(bannerValue);
                updateImage(index);
                currentIndex = index;
            });
        });

        prevNextButtons.forEach(function(button) {
            button.addEventListener("click", function() {
                if (this.value === "next") {
                    currentIndex = (currentIndex + 1) % Object.keys(myBanner).length;
                } else if (this.value === "prev") {
                    currentIndex = (currentIndex - 1 + Object.keys(myBanner).length) % Object.keys(myBanner).length;
                }
                updateImage(currentIndex);
            });
        });

        // ตั้งค่าบันเนอร์เริ่มต้น
        updateImage(currentIndex);
    });
})();