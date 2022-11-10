import axios from "axios";
import {setUser} from "../reducers/userReducer";

export const registration = async (email, password) => {
    // debugger
    try {
        const response = await axios.post(`http://localhost:5010/api/auth/registration`, {
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
            const response = await axios.post(`http://localhost:5010/api/auth/login`, {
                email,
                password
            })
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
            console.log(response.data)
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}

export const auth = () => {
    return async dispatch => {
        try {
            const response = await axios.get(`http://localhost:5010/api/auth/auth`, {
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