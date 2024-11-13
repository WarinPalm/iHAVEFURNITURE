export const cartItems = [
    {
        "image": "/image/Kitchen/kitchen21.png",
        "name": "kitchen21",
        "detail": "kitchen21asasasas",
        "price": 1500,
        "quantity": 10,
        "status": 'สั่งซื้อ'
    },
    {

        "image": "/image/Kitchen/kitchen22.png",
        "name": "kitchen222",
        "detail": "kitchen21asasasas",
        "price": 1500,
        "quantity": 10,
        "status": 'สั่งซื้อ'
    }
];


export const addToCart = (product) => {
    const item = { ...product, status:'สั่งซื้อ'}; // เพิ่มสถานะ 'สั่งซื้อ'
    cartItems.push(item);
};

export const getCartItems = () => cartItems;

export const updateCartStatus = (index, newStatus) => {
    if (cartItems[index]) {
        cartItems[index].status = newStatus;
    }
};

const today = new Date().toISOString().split('T')[0];
var currentdate = new Date();
var datetime = "Last Sync: " + currentdate.getDay() + "/" + currentdate.getMonth() 
+ "/" + currentdate.getFullYear() + " @ " 
+ currentdate.getHours() + ":" 
+ currentdate.getMinutes() + ":" + currentdate.getSeconds();

console.log(today)
console.log(datetime)