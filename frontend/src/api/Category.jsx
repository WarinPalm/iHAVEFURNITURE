import axios from 'axios'


export const createCategory = async (token, form) => {

    return axios.post('http://localhost:3000/api/category', form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const removeCategory = async (token, id) => {

    return axios.delete('http://localhost:3000/api/category/'+id, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
