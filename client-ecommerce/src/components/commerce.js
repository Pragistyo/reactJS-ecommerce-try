import React, { Component } from 'react'
import Compo from './component.js'
import Login from './login.js'
import Register from './register.js'
import Checkout from './checkout.js'
import { connect } from 'react-redux'
import { changeLoginRegis } from '../actions/compoActions'
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

class Commerce extends Component{
    constructor(props) {
        super(props)
    }
    
    render () {
        return (
            <main className="mdl-layout__content">
                <div className="page-content">
                    <h3 className="" align="center">{this.props.title}</h3>
                    <hr />
                    <div className="mdl-grid">
                        <Checkout myProp={[this.props.totalPrice, this.props.cart]}></Checkout>
                        <div className="mdl-cell--9-col">
                            <div className="mdl-grid">
                                <Route
                                    exact path="/"
                                    render={props => this.props.allItem.map(item => {
                                        return <Compo key={item._id} nama={item} receiveDataCart={this.receiveData}/>
                                    })}
                                />
                                <Route
                                    path="/login"
                                    render={props => <Login myProp={this.setFormLoginRegis.bind(this)} />}
                                />
                                <Route
                                    path="/register"
                                    render={props => <Register myProp={this.setFormLoginRegis.bind(this)} />}
                                />
                            </div>
                        </div>
                        <br />
                    </div>
                </div>
            </main>
        )
    }
    
    // receiveDataCart = { this.receiveData.bind(this) }

    setFormLoginRegis(val) {
        this.props.changeLoginRegis(val)
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
        totalPrice: state.lapak.totalPrice,
        cart: state.lapak.cart,
        allItem: state.lapak.allItem,
        title: state.lapak.title
    }
}

var ConnectedComponent = connect(
    mapStateToProps, mapDispatchToProps
)(Commerce)


export default ConnectedComponent