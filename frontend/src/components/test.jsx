import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Test() {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.post("http://localhost:3000/api/login")
            .then(res => {
                console.log(res.data); 
                setData(res.data.payload); 
            })
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    return (
        <div>
            
            {data.map((item, index) => (
                <div key={index}>
                    <p>{item.email}</p>
                    <p>{item.password}</p>
                </div>
            ))}
        </div>
    );
}

export default Test;
