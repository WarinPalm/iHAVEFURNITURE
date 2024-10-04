import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCartItems } from './CartItem';

const PriceContext = createContext();

export const PriceProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const vat = 0.07;

    useEffect(() => { //ให้อัพเดทตลอดเวลา
        const items = getCartItems(); 
        setCartItems(items); // อัปเดตค่าใน state
    }, []);

    const updateCartItems = (newCartItems) => {
        setCartItems(newCartItems);
    };

    const calTotal = () => {
        let totalPrice = 0;
        cartItems.forEach(item => {
            totalPrice += item.price * item.quantity; 
        });
        return totalPrice.toFixed(2);
    };

    const calNetTotal = () => {
        return calTotal();
    };

    const calVat = () => {
        let vatPrice = calTotal() * vat;
        return vatPrice.toFixed(2); 
    };

    const calProductPrice = () => {
        let totalPrice = calTotal();
        let productPrice = totalPrice - (totalPrice * vat);
        return productPrice.toFixed(2); 
    };

    const calShipping = () => {
        return cartItems.length === 0 ? 0 : 250;
    };

    const calDiscount = () => {
        return 10; // ส่วนลด
    };

    return (
        <PriceContext.Provider value={{ calTotal, calNetTotal, calVat, calProductPrice, calShipping, calDiscount, cartItems, updateCartItems}}>
            {children}
        </PriceContext.Provider>
    );
};

export const usePriceCalculate = () => useContext(PriceContext);


