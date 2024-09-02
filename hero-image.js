(function() {
    document.addEventListener("DOMContentLoaded", () => {
        const myBanner = {
            banner1: "/image/hero-image/banner1.jpg",
            banner2: "/image/hero-image/banner2.jpg",
            banner3: "/image/hero-image/banner3.jpg",
            banner4: "/image/hero-image/banner4.jpg"
        };
    
        const heroImage = document.querySelector(".hero-image");
        let currentIndex = 0;
        let direction = 1;
        let autoSlideInterval;
    
        const updateImage = (index) => {
            heroImage.style.backgroundImage = `url('${Object.values(myBanner)[index]}')`;
        };
    
        const updateButtonStyles = (index) => {
            document.querySelectorAll('.btn-banner').forEach((button, i) => {
                button.style.backgroundColor = i === index ? '#ffffff' : 'transparent';
                button.style.borderColor = i === index ? '#ffffff' : 'white';
                button.style.color = i === index ? '#ffffff' : 'white';
            });
        };
    
        const autoSlide = () => {
            currentIndex = (currentIndex + direction + Object.keys(myBanner).length) % Object.keys(myBanner).length;
            updateImage(currentIndex);
            updateButtonStyles(currentIndex);
        };
    
        document.querySelectorAll('.btn-banner').forEach((button, i) => {
            button.addEventListener('click', () => {
                currentIndex = i;
                direction = 1;
                updateImage(currentIndex);
                updateButtonStyles(currentIndex);
                clearInterval(autoSlideInterval);
                autoSlideInterval = setInterval(autoSlide, 3000);
            });
        });
    
        updateImage(currentIndex);
        updateButtonStyles(currentIndex);
        autoSlideInterval = setInterval(autoSlide, 3000);
    });
    
})();


