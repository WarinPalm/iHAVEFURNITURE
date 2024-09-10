import React from 'react';

const Category = ({ onCategoryClick, activeCategory }) => {
    return (
        <aside className="col-2 full-height-overflow">
            <ul className="nav-aside">
                <li
                    className={`category-nav ${activeCategory === 'sofa' ? 'active' : ''}`}
                    onClick={() => onCategoryClick('sofa')}
                >
                    Sofa
                </li>
                <li
                    className={`category-nav ${activeCategory === 'bed' ? 'active' : ''}`}
                    onClick={() => onCategoryClick('bed')}
                >
                    Bed
                </li>
                <li
                    className={`category-nav ${activeCategory === 'chair' ? 'active' : ''}`}
                    onClick={() => onCategoryClick('chair')}
                >
                    Chair
                </li>
                <li
                    className={`category-nav ${activeCategory === 'table' ? 'active' : ''}`}
                    onClick={() => onCategoryClick('table')}
                >
                    Table
                </li>
                <li
                    className={`category-nav ${activeCategory === 'lamp' ? 'active' : ''}`}
                    onClick={() => onCategoryClick('lamp')}
                >
                    Lamp
                </li>
                <li
                    className={`category-nav ${activeCategory === 'kitchen' ? 'active' : ''}`}
                    onClick={() => onCategoryClick('kitchen')}
                >
                    Kitchen
                </li>
            </ul>
        </aside>
    );
};

export default Category;
