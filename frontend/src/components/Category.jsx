import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Category = ({ onCategoryClick, activeCategory }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/api/category")
            .then(res => {
                setCategories(res.data);
            })
            .catch(error => console.error("Error fetching categories:", error));
    }, []);

    return (
        <>
        <aside className="col-2 full-height-overflow">
            <ul className="nav-aside">
            {categories.map((category, index) => (
                <li
                    key={index}
                    className={`category-nav ${activeCategory === category.name ? 'active' : ''}`}
                    onClick={() => onCategoryClick(category.name)}
                >
                    {category.name}
                </li>
            ))}

            </ul>
        </aside>
        
        </>
    );
};

export default Category;
