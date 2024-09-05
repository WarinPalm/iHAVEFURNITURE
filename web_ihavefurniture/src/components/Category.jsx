import React, { useState, useEffect } from "react";

const Category = ({ onCategoryClick }) => {
    const [activeCategory, setActiveCategory] = useState('');

    useEffect(() => {
        // ใช้ค่าเริ่มต้นจาก localStorage หรือจากค่าเริ่มต้นที่คุณต้องการ
        const savedCategory = localStorage.getItem('currentCategory') || 'sofa';
        setActiveCategory(savedCategory);
    }, []);

    const handleCategoryClick = (category) => {
        setActiveCategory(category);
        onCategoryClick(category);
    };

    return (
        <aside className="col-2 full-height-overflow">
            <ul className="nav-aside">
                <li
                    className={`category-nav ${activeCategory === 'sofa' ? 'active' : ''}`}
                    onClick={() => handleCategoryClick('sofa')}
                >
                    Sofa
                </li>
                <li
                    className={`category-nav ${activeCategory === 'bed' ? 'active' : ''}`}
                    onClick={() => handleCategoryClick('bed')}
                >
                    Bed
                </li>
                <li
                    className={`category-nav ${activeCategory === 'chair' ? 'active' : ''}`}
                    onClick={() => handleCategoryClick('chair')}
                >
                    Chair
                </li>
                <li
                    className={`category-nav ${activeCategory === 'table' ? 'active' : ''}`}
                    onClick={() => handleCategoryClick('table')}
                >
                    Table
                </li>
                <li
                    className={`category-nav ${activeCategory === 'lamp' ? 'active' : ''}`}
                    onClick={() => handleCategoryClick('lamp')}
                >
                    Lamp
                </li>
                <li
                    className={`category-nav ${activeCategory === 'kitchen' ? 'active' : ''}`}
                    onClick={() => handleCategoryClick('kitchen')}
                >
                    Kitchen
                </li>
            </ul>
        </aside>
    );
};

export default Category;
