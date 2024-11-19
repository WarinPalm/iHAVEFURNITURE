import axios from "axios";

export const fetchOrders = (token) =>{
    return axios.get('http://localhost:3000/api/orders',{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
}
export const submitPayment =(id) =>{
    return axios.put(`http://localhost:3000/api/payment/${id}`, form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
export const cancleOrder =(id) =>{
    return axios.put(`http://localhost:3000/api/payment/${id}`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

