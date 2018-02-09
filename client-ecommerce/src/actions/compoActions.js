import axios from 'axios'
import swal from 'sweetalert'
import React, { Component } from 'react'
import { Redirect, withRouter } from 'react-router-dom'

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

export const getCategory = (params) => {
    // alert(params)
    return (dispatch) => {
        http.get(`category/${params}`)
        .then(({data}) => {
            dispatch({
                type: 'GET_CATEGORY',
                payload: data
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

export const clearCart = (params) => {
    return (dispatch) => {
        dispatch({
                type: 'CLEAR_CART',
                payload: params
            }, swal('Your Cart cleared', '', 'success'))
    }
}

export const checkoutAction = (params) => {
    alert(JSON.stringify(params.cartFront))
    if (params.totalPrice === 0 ) {
        swal('Please buy something to checkout', '', 'warning')
        return {
            type: 'CHECKOUT_FAILED'
        }
    } else {
        return (dispatch) => {
            http.post('transaction',{
                customerId: params.customerId,
                cart: params.cartFront,
                totalPrice: params.totalPrice
            },{
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then( result => {
                alert(JSON.stringify(result))
                dispatch({
                    type: 'CHECKOUT'
                })
            })
        }
    }
}

export const destroyItem = {
    type: 'DESTROY_ITEM'
}

export const login = (params, history) => {
    return (dispatch) => {
        http.post('customer/login',{
            username: params.username,
            password: params.password
        })
        .then( result =>{ 
            if (result.data.err) {
                // alert(JSON.stringify(result))
                alert (result.data.err.msg)
            } else {
                alert('terdispatch')
                localStorage.setItem('token', result.data.token)
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
                payload: {result:result, token:token}
            },historyTrans({customerId:result.data.id}))
        })
    }
}

export const historyTrans = (params) => {
    // alert(JSON.stringify(params))
    return (dispatch) => {
        http.get(`transaction/${params.customerId}`, {
            headers: {
                token:localStorage.getItem('token')
            }
        })
        .then(({data}) => {
            if (data.name ==='JsonWebTokenError') {
                alert('PLEASE LOGIN')
            } else {
                dispatch({
                    type: 'HISTORY_TRANS',
                    payload: data
                })
            }
        })
    }
}

export const doLogout = (params) => {
    return {
        type: 'LOGOUT'
    }
}

export const register = (params) => {
    alert(JSON.stringify(params))
    return (dispatch) => {
        http.post('customer',{
            username: params.username,
            password: params.password,
            email: params.email
        })
        .then(result=>{
            if (result.data.errmsg) {
                swal('Username/Email already exist', '', 'error')
            } else {
                alert(JSON.stringify(result))
                // this.props.history.push('/login')
                // return <Redirect to="/login"/>
            }
        })
        .catch(err=>{
            console.log(err)
        })
        // type: 'REGISTER'
    }
}