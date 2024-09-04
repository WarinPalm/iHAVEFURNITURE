import React, { useState, useEffect } from "react";
import Navbar from '../Navbar/Navbar';
import LoginModal from '../Modal/LoginModal';
import ForgotPasswordModal from '../Modal/ForgotPasswordModal';
import HeroImage from '../HeroImage';
import Category from '../Aside/Category';

const Home = () => {
    const [currentCategory, setCurrentCategory] = useState(localStorage.getItem('currentCategory') || 'sofa');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(window.location.pathname.includes('seeall.html') ? 12 : 6);
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    const myProduct = {
        sofa: [
            { title: "Sofa1", text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.", image: "/image/Sofa/sofa1.avif", link: "#" },
            { title: "Sofa2", text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.", image: "/image/Sofa/sofa2.avif", link: "#" },
            { title: "Sofa3", text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.", image: "/image/Sofa/sofa3.avif", link: "#" },
            { title: "Sofa4", text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.", image: "/image/Sofa/sofa4.avif", link: "#" },
            { title: "Sofa5", text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.", image: "/image/Sofa/sofa5.avif", link: "#" },
            { title: "Sofa6", text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.", image: "/image/Sofa/sofa6.avif", link: "#" },
            { title: "Sofa7", text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.", image: "/image/Sofa/sofa7.avif", link: "#" },
            { title: "Sofa8", text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.", image: "/image/Sofa/sofa8.avif", link: "#" },
            { title: "Sofa9", text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.", image: "/image/Sofa/sofa9.avif", link: "#" },
            { title: "Sofa10", text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.", image: "/image/Sofa/sofa10.avif", link: "#" },
            { title: "Sofa11", text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.", image: "/image/Sofa/sofa11.avif", link: "#" },
            { title: "Sofa12", text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.", image: "/image/Sofa/sofa12.avif", link: "#" },
            { title: "Sofa13", text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.", image: "/image/Sofa/sofa13.avif", link: "#" },
            { title: "Sofa14", text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.", image: "/image/Sofa/sofa14.avif", link: "#" },
        ],
        bed: [
            { title: "Bed1", text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.", image: "/image/Bed/bed1.avif", link: "#" }
        ],
        chair: [
            { title: "Chair1", text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.", image: "/image/Chair/chair1.avif", link: "#" }
        ],
        table: [
            { title: "Table1", text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.", image: "/image/Table/table1.avif", link: "#" }
        ],
        lamp: [
            { title: "Lamp1", text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.", image: "/image/Lamp/lamp1.avif", link: "#" }
        ],
        kitchen: [
            { title: "kitchen1", text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.", image: "/image/Kitchen/kitchen1.avif", link: "#" }
        ],
    };

    useEffect(() => {
        // Ensure that itemsPerPage is valid and calculate total pages correctly
        const categoryItems = myProduct[currentCategory] || [];
        const itemsPerPageLocal = window.location.pathname.includes('seeall.html') ? 12 : 6;
        setItemsPerPage(itemsPerPageLocal);
        setProducts(categoryItems);
        setTotalPages(Math.ceil(categoryItems.length / itemsPerPageLocal));
    }, [currentCategory]);

    const handleCategoryClick = (category) => {
        setCurrentCategory(category);
        localStorage.setItem('currentCategory', category);
        setCurrentPage(1); 
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    const renderProducts = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, products.length);

        return products.slice(startIndex, endIndex).map((product, index) => (
            <div className="col-4 mb-3" key={index}>
                <div className="card" style={{ width: '18rem' }}>
                    <img src={product.image} className="card-img-top" alt={product.title} />
                    <div className="card-body">
                        <h5 className="card-title">{product.title}</h5>
                        <p className="card-text">{product.text}</p>
                        <div className="colored_button_div">
                            <a href={product.link} className="colored_button">Add to cart</a>
                        </div>
                    </div>
                </div>
            </div>
        ));
    };

    return (
        <>
            <Navbar />
            <LoginModal />
            <ForgotPasswordModal />
            <HeroImage />

            <section className="list-product">
                <div className="container text-center">
                    <div className="col-2">
                        <h1 style={{ paddingTop: '30px' }} className="fs-2">Category</h1>
                    </div>
                    <div className="col-10">
                        <img src="./sofa1.avif" alt="" />
                        <a className="d-flex justify-content-end" id="seeall-btn" href="seeall.html">See All</a>
                    </div>
                    <img src="../../../../public/image/sofa/sofa1.svg" alt="" />
                    <img src="./assets/react.svg" alt="" />
                    <div className="row">
                        <Category onCategoryClick={handleCategoryClick} />
                        <div className="col-1"></div>
                        <div className="col-9 row-gap-2">
                            <div className="row" id="show-product">
                                {renderProducts()}
                            </div>
                        </div>
                    </div>
                    {/* <div id="pagination">
                        {currentPage > 1 && <button onClick={handlePrevPage}>Previous Page</button>}
                        {currentPage < totalPages && <button onClick={handleNextPage}>Next Page</button>}
                    </div> */}
                </div>
            </section>
        </>
    );
};

export default Home;
