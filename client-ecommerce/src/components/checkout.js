import React, { Component } from 'react'
import { clearCart, checkoutAction, loginStatus, historyTrans } from '../actions/generalAction'
import {connect} from 'react-redux'
import swal from 'sweetalert'


class Checkout extends Component{
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="mdl-cell--3-col mdl-cell--12-col-phone mdl-cell--12-col-tablet">
                { this.sidebarView.call(this) }
            </div>
        )
    }

    sidebarView() {
        if (!this.props.formLoginRegis) {
            return <div className="mdl-cell--12-col">
                <div>
                    <h3>Your Shopping Cart:</h3><hr />
                    <p>Total Price: Rp. {this.props.totalPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")},-</p>
                    <p>Total Item: {this.props.cart.length}</p>
                    <p>Item Cart: </p>
                    {this.itemChosen.call(this)}
                    <button
                        className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
                        onClick={this.activateCheckout.bind(this)}>
                        CHECKOUT
                    </button>
                    <button
                        className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
                        onClick={this.clearCart.bind(this)}>
                        CLEAR SHOPPING CART</button>
                </div>
                <div>
                    <h3>History Transaction</h3><hr/>
                    {this.historyTransaction()}
                    <br/>
                    <button 
                        className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
                        onClick={this.triggerTrans.bind(this)}
                    >Generate History</button>
                </div>
            </div>
        } else {
            return <div className="mdl-cell--2-col"></div>
        }
    }

    itemChosen() {
        if (this.props.cartFront.length !== 0) {
            return <div>
                <table className="">
                    <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>Quantity</th>
                            <th>Price </th>
                        </tr>
                    </thead>
                    {this.props.cartFront.map(item => {
                        return <tbody key={item._id}>
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.quantity} pc(s)</td>
                                <td>Rp. {(item.price*item.quantity).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")},-</td>
                                <button 
                                onClick={this.removeItem.bind(this, item)}
                                class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect">
                                    <i class="material-icons">delete</i>
                                </button>
                            </tr>
                        </tbody>
                    })}
                </table>
            </div>
        }
    }

    removeItem (objItem) {
        swal('Not Finished Yet !!', '', 'error')
        if (objItem.quantity > 1) {
            alert('minus quantity')
            // bikin action
            //looping cart front, temuin id nya, kurangin quantity
        } else {
            alert('splice')
            //bikin action
            //looping cart front, temuin id, splice
        }
    }

    historyTransaction () {
        if (this.props.history.length !== 0) {
            return <div>
                    {this.props.history.map(item => {
                        return <div>
                            <p>Date: {item.created_at}</p>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>@Price</th>
                                        <th>Quantity</th>
                                    </tr>
                                </thead>
                                {item.cart.map(eachCart =>{
                                    return <tbody>
                                            <tr>
                                                <th>{eachCart.name}</th>
                                                <th>Rp. {eachCart.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")},- </th>
                                                <th>{eachCart.quantity}</th>
                                            </tr>
                                        </tbody>
                                })}
                            </table>
                            <p>Total Price: Rp. {item.totalPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}</p>
                            <hr/>
                        </div>
                    })}
            </div>
        } else {
            return this.props.history.length
        }
    }

    triggerTrans (){
        this.props.historyTrans({customerId:this.props.userData.userId})
    }
    
    activateCheckout(params) {
        if (this.props.loginStatus) {
            this.props.checkoutAction({
                customerId:this.props.userData.userId,
                cartFront: this.props.cartFront,
                totalPrice: this.props.totalPrice
            })
        } else {
            swal('Please Login', 'Login to Checkout your shopping', 'warning')    
        }
    }

    clearCart () {
        this.props.clearCart()
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        clearCart: (params) => dispatch(clearCart(params)),
        checkoutAction: (params) => dispatch(checkoutAction(params)),
        historyTrans: (params) => dispatch(historyTrans(params))
    }
}

const mapStateToProps = (state) => {
    return {
        formLoginRegis: state.lapak.formLoginRegis,
        cartFront: state.lapak.cartFront,
        cart: state.lapak.cart,
        totalPrice: state.lapak.totalPrice,
        loginStatus: state.login.loginStatus.status,
        userData: state.login.userData,
        history: state.lapak.history
    }
}

var ConnectedComponent = connect(
    mapStateToProps, mapDispatchToProps
)(Checkout)

export default ConnectedComponent