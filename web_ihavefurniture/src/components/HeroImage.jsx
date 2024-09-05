import React, { useState, useEffect } from 'react';

const HeroImage = () => {
    const myBanner = {
        banner1: "/image/hero-image/banner1.jpg",
        banner2: "/image/hero-image/banner2.jpg",
        banner3: "/image/hero-image/banner3.jpg",
        banner4: "/image/hero-image/banner4.jpg"
    };

    const [currentIndex, setCurrentIndex] = useState(0);
    const [autoSlideInterval, setAutoSlideInterval] = useState(null);

    const updateImage = (index) => {
        return Object.values(myBanner)[index];
    };

    const updateButtonStyles = (index) => {
        const buttons = document.querySelectorAll('.btn-banner');
        buttons.forEach((button, i) => {
            button.style.backgroundColor = i === index ? '#ffffff' : 'transparent';
            button.style.borderColor = i === index ? '#ffffff' : 'white';
            button.style.color = i === index ? '#ffffff' : 'white';
        });
    };

    const autoSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % Object.keys(myBanner).length);
    };

    useEffect(() => {
        updateButtonStyles(currentIndex);
        if (!autoSlideInterval) {
            const interval = setInterval(autoSlide, 3000);
            setAutoSlideInterval(interval);
        }
        return () => clearInterval(autoSlideInterval);
    }, [currentIndex, autoSlideInterval]);

    const handleButtonClick = (index) => {
        setCurrentIndex(index);
        clearInterval(autoSlideInterval);
        const newInterval = setInterval(autoSlide, 3000);
        setAutoSlideInterval(newInterval);
    };

    return (
        <section className="cover">
            <div className="container">
                <div className="col-12 hero-image" style={{ backgroundImage: `url('${updateImage(currentIndex)}')` }}>
                    {/* Hero Image Content */}
                </div>
                <div className="btn-hero-image">
                    {Object.keys(myBanner).map((key, index) => (
                        <button
                            key={key}
                            className="btn btn-dark btn-banner"
                            onClick={() => handleButtonClick(index)}
                        ></button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HeroImage;
