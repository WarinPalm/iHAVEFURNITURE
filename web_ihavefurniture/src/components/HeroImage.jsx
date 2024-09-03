import React from 'react';

const HeroImage = () => {
    return (
        <section className="cover">
            <div className="container">
                <div className="col-12 hero-image">
                    {/* Hero Image Content */}
                </div>
                <div className="btn-hero-image">
                    <button className="btn btn-dark btn-banner" value="banner1"></button>
                    <button className="btn btn-dark btn-banner" value="banner2"></button>
                    <button className="btn btn-dark btn-banner" value="banner3"></button>
                    <button className="btn btn-dark btn-banner" value="banner4"></button>
                </div>
            </div>
        </section>
    );
};

export default HeroImage;
