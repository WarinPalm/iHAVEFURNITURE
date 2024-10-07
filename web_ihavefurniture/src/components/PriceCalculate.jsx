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
    const calTotal = (status) => {
        let totalPrice = 0;
        const filteredItems = status ? cartItems.filter(item => item.status === status) : cartItems;

        filteredItems.forEach(item => {
            totalPrice += item.price * item.quantity; 
        });

        return totalPrice.toFixed(2);
    };

    const calNetTotal = (status) => {
        return calTotal(status);
    };

    const calVat = (status) => {
        let vatPrice = calTotal(status) * vat;
        return vatPrice.toFixed(2); 
    };

    const calProductPrice = (status) => {
        let totalPrice = calTotal(status);
        let productPrice = totalPrice - (totalPrice * vat);
        return productPrice.toFixed(2); 
    };

    const calShipping = () => {
        return cartItems.length === 0 ? 0 : 250;
    };

    const calDiscount = () => {
        return 10; // Discount
    };
    // const calNetTotal = (status) => {
    //     const total = calTotal(status);
    //     const shipping = calShipping();
    //     const discount = calDiscount();
    //     return (total + shipping - (total * (discount / 100))).toFixed(2);
    // };

    return (
        <PriceContext.Provider value={{
            calTotal,
            calNetTotal,
            calVat,
            calProductPrice,
            calShipping,
            calDiscount,
            cartItems,
            updateCartItems
        }}>
            {children}
        </PriceContext.Provider>
    );
};

export const usePriceCalculate = () => useContext(PriceContext);
