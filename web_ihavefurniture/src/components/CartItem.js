export const cartItems = [];

export const addToCart = (product) => {
    const item = { ...product, status: null }; // เพิ่มสถานะ 'null'
    cartItems.push(item);
};

export const getCartItems = () => cartItems;

export const updateCartStatus = (index, newStatus) => {
    if (cartItems[index]) {
        cartItems[index].status = newStatus;
    }
};
