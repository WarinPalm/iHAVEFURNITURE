import React, { createContext, useContext, useEffect, useState } from 'react';

const PricingContext = createContext();

export const PricingProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const vat = 0.07; // 7% VAT

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(items);
    }, []);

    const calTotal = () => {
        let totalPrice = 0;
        cartItems.forEach(item => {
            totalPrice += item.price * item.quantity; 
        });
        return totalPrice.toFixed(2);
    };
    const calNetTotal = () => {
        let totalPrice = 0;
        cartItems.forEach(item => {
            totalPrice += item.price * item.quantity; 
        });
        return totalPrice.toFixed(2);
    };

    const calVat = () => {
        let totalPrice = calTotal(); 
        let vatPrice = totalPrice * vat;
        return vatPrice.toFixed(2); 
    };

    const calProductPrice = () => {
        let totalPrice = calTotal(); 
        let productPrice = totalPrice - (totalPrice * vat);
        return productPrice.toFixed(2); 
    };

    const calShipping = () => {
        let shippingPrice;
        if(cartItems.length === 0){
            shippingPrice = 0
        }
        else{
            shippingPrice = 250
        }
        return shippingPrice;
    };

    const calDiscount = () => {
        let discount = 10;
        
        return discount;
    };

    return (
        <PricingContext.Provider value={{ cartItems, calTotal, calNetTotal, calVat, calProductPrice, calShipping, calDiscount }}>
            {children}
        </PricingContext.Provider>
    );
    
    
};

export const usePricing = () => {
    return useContext(PricingContext);
};
