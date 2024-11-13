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
        // Ensure that updateButtonStyles is called after state has been updated
        updateButtonStyles(currentIndex);
    }, [currentIndex]);

    useEffect(() => {
        // Set up the auto slide interval when component mounts
        const interval = setInterval(autoSlide, 3000);
        setAutoSlideInterval(interval);

        // Clean up interval on component unmount
        return () => clearInterval(interval);
    }, []);

    const handleButtonClick = (index) => {
        setCurrentIndex(index);
        clearInterval(autoSlideInterval); // Clear the current interval
        const newInterval = setInterval(autoSlide, 3000); // Set a new interval
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
