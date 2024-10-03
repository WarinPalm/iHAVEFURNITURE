export const cartItems = [
    {
        "image": "/image/Kitchen/kitchen21.png",
        "name": "kitchen21",
        "detail": "kitchen21asasasas",
        "price": 1500,
        "quantity": 100,
        "status": null
    },
    {

        "image": "/image/Kitchen/kitchen22.png",
        "name": "kitchen222",
        "detail": "kitchen21asasasas",
        "price": 1500,
        "quantity": 10,
        "status": null
    }
];


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
