import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
function Test() {
    const [chooseQuestion, setChooseQuestion] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(() => {
        const savedCategory = localStorage.getItem('currentCategory');
        return savedCategory ? savedCategory : 'sofa';
    });
    
    const handleCategoryClick = (category) => {
        setCurrentCategory(category);
        localStorage.setItem('currentCategory', category);
    };

    const [data, setData] = useState([]);
    
    useEffect(() => {
        axios.get("http://localhost:3000/api/products")
            .then(res => {
                setData(res.data); 
            })
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    return (
        <>
        <Navbar onCategoryClick={handleCategoryClick} />
        <div>
            {data.length > 0 && (
                <table border="1" cellPadding="10" cellSpacing="0">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>{item.price}</td>
                                <td>{item.quantity}</td>
                                <td>{item.categoryId}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
        </>
    );
}

export default Test;
