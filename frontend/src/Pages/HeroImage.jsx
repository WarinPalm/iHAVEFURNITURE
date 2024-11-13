import React, { useState, useEffect } from 'react';

const HeroImage = () => {
    const myBanner = {
        banner1: "/image/hero-image/banner1.jpg",
        banner2: "/image/hero-image/banner2.jpg",
        banner3: "/image/hero-image/banner3.jpg",
        banner4: "/image/hero-image/banner4.jpg"
    };

    const [currentIndex, setCurrentIndex] = useState(0);

    const updateImage = (index) => {
        return Object.values(myBanner)[index];
    };

    const autoSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % Object.keys(myBanner).length);
    };

    useEffect(() => {
        const interval = setInterval(autoSlide, 3000);
        return () => clearInterval(interval);
    }, []);

    const handleButtonClick = (index) => {
        setCurrentIndex(index);
    };

    return (
        <section className="cover">
            <div className="container">
                <div
                    className="col-12 hero-image"
                    style={{
                        backgroundImage: `url('${updateImage(currentIndex)}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '70vh',
                        borderRadius: '3%',
                    }}
                >
                    {/* Hero Image Content */}
                </div>
                <div className="btn-hero-image">
                    {Object.keys(myBanner).map((key, index) => (
                        <button
                            key={key}
                            className={`btn btn-dark btn-banner ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => handleButtonClick(index)}
                        ></button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HeroImage;
