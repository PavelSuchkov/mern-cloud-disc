import axios from "axios";
import {setUser} from "../reducers/userReducer";
import {API_URL} from "../config";

export const registration = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}api/auth/registration`, {
            email,
            password
        })
        alert(response.data.message)
    } catch (e) {
        console.log(e)
        alert(e.response)
    }
}

export const login = (email, password) => {
    return async dispatch => {
        try {
            const response = await axios.post(`${API_URL}api/auth/login`, {
                email,
                password
            })
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}

export const auth = () => {
    return async dispatch => {
        try {
            const response = await axios.get(`${API_URL}api/auth/auth`, {
                headers: {authorization: `Bearer ${localStorage.getItem('token')}`}  // Authorization or authorztion ?????
            })
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
            // console.log(response.data)
        } catch (e) {
            alert(e.response.data.message)
            localStorage.removeItem('token')
        }
    }
}


export const uploadAvatar = (file) => {
    return async dispatch => {
        try {
            const formData = new FormData()
            formData.append('file', file)
            const response = await axios.post(`${API_URL}api/files/avatar`, formData, {
                headers: {authorization: `Bearer ${localStorage.getItem('token')}`}  // Authorization or authorztion ?????
            })
            dispatch(setUser(response.data))
        } catch (e) {
            console.log(e)
        }
    }
}

export const deleteAvatar = () => {
    return async dispatch => {
        try {

            const response = await axios.delete(`${API_URL}api/files/avatar`, {
                headers: {authorization: `Bearer ${localStorage.getItem('token')}`}  // Authorization or authorztion ?????
            })
            dispatch(setUser(response.data))
        } catch (e) {
            console.log(e)
        }
    }
}