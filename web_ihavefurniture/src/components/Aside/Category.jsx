import React from 'react';

const Category = ({ onCategoryClick }) => {
    return (
        <aside className="col-2 full-height-overflow">
            <ul className="nav-aside">
                <li className="hov-primary" onClick={() => onCategoryClick('sofa')}>Sofa</li>
                <li className="hov-primary" onClick={() => onCategoryClick('bed')}>Bed</li>
                <li className="hov-primary" onClick={() => onCategoryClick('chair')}>Chair</li>
                <li className="hov-primary" onClick={() => onCategoryClick('table')}>Table</li>
                <li className="hov-primary" onClick={() => onCategoryClick('lamp')}>Lamp</li>
                <li className="hov-primary" onClick={() => onCategoryClick('kitchen')}>Kitchen</li>
            </ul>
        </aside>
    );
};

export default Category;