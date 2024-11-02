import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Test() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/api/category")
            .then(res => {
                setData(res.data); 
            })
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    return (
        <div>
            {data.map((item, index) => (
                <div key={index}>
                    <p>{item.id}</p>
                    <p>{item.name}</p>
                </div>
            ))}
        </div>
    );
}

export default Test;
