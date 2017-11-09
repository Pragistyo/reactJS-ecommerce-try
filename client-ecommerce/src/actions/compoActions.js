import axios from 'axios'
import { Redirect } from 'react-router'

const http = axios.create({
    baseURL:`http://localhost:3030/`
    // baseURL: `http://35.197.157.222:3030`
})

export const getAllItem = () => {
    // return (dispatch, getState) =>{
    return (dispatch) => {
        http.get('/')
        .then( result =>{
            dispatch({
                type: 'GET_ALLITEM',
                payload: result.data
            })
        })
    }
}

export const setSelectedItem = (item) => {
    return {
        type: 'SET_ITEM',
        payload: {
            itemCurrent: item
        }
    }
}

export const changeLoginRegis = (params) => {
    return {
        type: 'UPDATE_FORM_LOGIN_REGIS',
        payload: params
    }
}

export const addCart = (params) => {
    return {
        type: 'ADD_TO_CART',
        payload: params
    }
}

export const addCartFront = (params) => {
    return {
        type: 'ADD_TO_CART_FRONT',
        payload: params
    }
}

export const setTitle = (params) => {
    return {
        type: 'CHANGE_TITLE',
        payload: params
    }
}

export const setTotalPrice = (params) => {
    return {
        type: 'TOTAL_PRICE',
        payload: params
    }
}

export const destroyItem = {
    type: 'DESTROY_ITEM'
}

export const login = (params) => {
    return (dispatch) => {
        http.post('customer/login',{
            username: params.username,
            password: params.password
        })
        .then( result =>{ 
            if (result.data.err) {
                alert(JSON.stringify(result))
                alert (result.data.err.msg)
            } else {
                localStorage.setItem('token', result.data.token)
                // alert(JSON.stringify(result))
                dispatch(verify(result.data.token))
            }
        })
    }
}

export const verify = (token) => {
    return (dispatch) => {
        http.post('customer/verify',{
            token:token
        })
        .then( result => {
            dispatch({
                type: 'VERIFY_USER',
                payload: result
            })
        })
    }
}