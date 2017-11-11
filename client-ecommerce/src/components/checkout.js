import React, { Component } from 'react'
import { changeLoginRegis } from '../actions/compoActions'
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
                <h3>Your Shopping Cart:</h3><hr />
                <p>Total Price: Rp. {this.props.totalPrice},-</p>
                <p>Total Item: {this.props.cart.length}</p>
                <p>Item Cart: </p>
                {this.itemChosen.call(this)}
                <button
                    className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
                    onClick={this.activateLasers}>
                    CHECKOUT
        </button>
            </div>
        } else {
            return <div className="mdl-cell--2-col"></div>
        }
    }

    itemChosen() {
        if (this.props.cartFront.length !== 0) {
            return <div>
                <table>
                    <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    {this.props.cartFront.map(item => {
                        return <tbody key={item._id}>
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.quantity} pc(s)</td>
                                <td>Rp. {item.price},-</td>
                            </tr>
                        </tbody>
                    })}
                </table>
            </div>
        }
    }
    
    activateLasers(bla) {
        alert('not yet finished')
        // swal(JSON.stringify(this.props.cart), 'yuhuuu', 'success')
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        changeLoginRegis: (params) => dispatch(changeLoginRegis(params))
    }
}

const mapStateToProps = (state) => {
    // alert(JSON.stringify(state.lapak))
    return {
        formLoginRegis: state.lapak.formLoginRegis,
        cartFront: state.lapak.cartFront,
        cart: state.lapak.cart,
        totalPrice: state.lapak.totalPrice
    }
}

var ConnectedComponent = connect(
    mapStateToProps, mapDispatchToProps
)(Checkout)

export default ConnectedComponent