import React from 'react';

const Category = () => {
    return (
        <aside className="col-2 full-height-overflow">
            <ul className="nav-aside">
                <a href="#" data-category="sofa">
                    <li className="hov-primary">Sofa</li>
                </a>
                <a href="#" data-category="bed">
                    <li className="hov-primary">Bed</li>
                </a>
                <a href="#" data-category="chair">
                    <li className="hov-primary">Chair</li>
                </a>
                <a href="#" data-category="table">
                    <li className="hov-primary">Table</li>
                </a>
                <a href="#" data-category="lamp">
                    <li className="hov-primary">Lamp</li>
                </a>
                <a href="#" data-category="kitchen">
                    <li className="hov-primary">Kitchen</li>
                </a>
            </ul>
        </aside>
    );
};

export default Category;
