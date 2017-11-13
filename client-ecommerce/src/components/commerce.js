import React, { Component } from 'react'
import Compo from './component.js'
import Categ from './category.js'
import Login from './login.js'
import Register from './register.js'
import Checkout from './checkout.js'
import { connect } from 'react-redux'
import { changeLoginRegis, setTitle } from '../actions/compoActions'
import {
    BrowserRouter as Router,
    Route,
    Link,
    withRouter
} from 'react-router-dom'

class Commerce extends Component{
    constructor(props) {
        super(props)
    }
    
    render () {
        return (
            <main className="mdl-layout__content">
                <div className="page-content">
                    <h3 className="" align="center">{this.props.userData.username}</h3>
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
                                    exact path="/category/:category"
                                    render={props => this.props.allItem.map(item => {
                                        return <Categ {...props} key={item._id} nama={item} />
                                    })}
                                />
                                <Route
                                    exact path="/login"
                                    render={props => <Login myProp={this.setFormLoginRegis.bind(this)} />}
                                />
                                <Route
                                    exact path="/register"
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
    
    ComponentWillMount () {
        this.props.setTitle('All Item')
        this.props.title
    }

    ComponentDidMount () {
        this.props.setTitle('All Item')
    }
    
    setFormLoginRegis(val) {
        this.props.changeLoginRegis(val)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeLoginRegis: (params) => dispatch(changeLoginRegis(params)),
        setTitle: (params) => dispatch(setTitle(params))
    }
}

const mapStateToProps = (state) => {
    // alert(JSON.stringify(state.lapak))
    return {
        formLoginRegis: state.lapak.formLoginRegis,
        totalPrice: state.lapak.totalPrice,
        cart: state.lapak.cart,
        allItem: state.lapak.allItem,
        title: state.lapak.title,
        userData: state.login.userData
    }
}

var ConnectedComponent = connect(
    mapStateToProps, mapDispatchToProps
)(Commerce)


export default withRouter(ConnectedComponent)