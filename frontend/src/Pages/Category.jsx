import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Category = ({ onCategoryClick, activeCategory }) => {
    const [categories, setCategories] = useState([]);
    const categoriesNotBanner = categories.filter(category => category.name !== 'banner')
    //ดึงข้อมูลหมวดหมู่
    const fetchCategories = () => {
        axios.get("http://localhost:3000/api/categories")
            .then(res => setCategories(res.data))
            .catch(error => console.error("Error fetching categories:", error));
    };

    useEffect(() => {    
        fetchCategories();
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
