import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCartItems } from './CartItem';

const PriceContext = createContext();

export const PriceProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const vat = 0.07;

    useEffect(() => {
        const items = getCartItems(); 
        setCartItems(items);
    }, []);

    const updateCartItems = (newCartItems) => {
        setCartItems(newCartItems);
    };

    // ฟังก์ชันไว้สร้างยอดรวม โดยอิงผ่าน status
    const calNetTotal = (status) => {
        let totalPrice = 0;
        const filteredItems = status ? cartItems.filter(item => item.status === status) : cartItems;

        filteredItems.forEach(item => {
            totalPrice += item.price * item.quantity; 
        });

        return totalPrice.toFixed(2);
    };


    const calProductPrice = (status) => {   
        let totalPrice = calNetTotal(status);
       
        return totalPrice; 
    };


    return (
        <PriceContext.Provider value={{
            calNetTotal,
            calProductPrice,
            cartItems,
            updateCartItems
        }}>
            {children}
        </PriceContext.Provider>
    );
};

export const usePriceCalculate = () => useContext(PriceContext);
