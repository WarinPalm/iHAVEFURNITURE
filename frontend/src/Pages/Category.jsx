import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Category = ({ onCategoryClick, activeCategory }) => {
    const [categories, setCategories] = useState([]);
    const categoriesNotBanner = categories.filter(category => category.name !== 'banner')

    useEffect(() => {
        const fetchCategories = () => {
            axios.get("http://localhost:3000/api/categories")
                .then(res => setCategories(res.data))
                .catch(error => console.error("Error fetching categories:", error));
        };
    
        fetchCategories();
        const intervalId = setInterval(fetchCategories, 10000); // Fetch ทุก 10 วิ
    
        return () => clearInterval(intervalId);
    }, []);
    
    return (
        <>
        <aside className="col-2 full-height-overflow text-center">
            <ul className="nav-aside">
        
            {categoriesNotBanner.map(category => (
                <li
                    key={category.id}
                    className={`category-nav ${activeCategory === category.id ? 'active' : ''}`}
                    onClick={() => onCategoryClick(category.id)}
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
