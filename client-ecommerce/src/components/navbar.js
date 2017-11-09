import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeLoginRegis, setTitle, doLogout } from '../actions/compoActions'
import logo from '../logo.svg'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect
} from 'react-router-dom'


class Navbar extends Component {
    constructor(props) {
        super(props)
    }
    render () {
        return (
        <header className="mdl-layout__header">
            <div className="mdl-layout__header-row">
                <Link
                    className="mdl-navigation__link"
                    to="/"
                    onClick={this.changeTitle.bind(this, 'All Item')}
                >All Item
              </Link>
                <nav className="mdl-navigation">
                    <Link to="" id="submenu" className="mdl-navigation__link">Category</Link>
                </nav>
                <ul className="mdl-menu mdl-menu--bottom-left mdl-js-menu mdl-js-ripple-effect"
                    htmlFor="submenu">
                    <li className="mdl-menu__item">Phone</li>
                    <li className="mdl-menu__item">Tablet</li>
                    <li className="mdl-menu__item">Watch</li>
                </ul>
                <div className="">
                    <img src={logo} className="App-logo" alt="logo" />
                </div>
                <div className="">
                    <span className="mdl-layout-title logo">Ecommerce</span>
                </div>
                <div className="mdl-layout-spacer"></div>
                {this.buttonLog.call(this)}
            </div>
        </header>
        )
    }

    ComponentWillMount () {
    }

    buttonLog () {
        if (!this.props.loginStatus.status) {
            return <nav className="mdl-navigation">
                <Link
                    className="mdl-navigation__link"
                    to="/login"
                    onClick={this.changeTitle.bind(this, 'Login')}
                >Login
                </Link>
                <Link
                    className="mdl-navigation__link"
                    onClick={this.changeTitle.bind(this, 'Register')}
                    to="/register"
                >Register
                </Link>
            </nav>
        } else {
            return <button onClick={this.logoutMethod.bind(this)}>LOGOUT</button>
        }
    }

    logoutMethod () {
        alert('localstorage clear')
        localStorage.clear()
        this.props.doLogout()
        return <Redirect to="/" />
    }

    changeTitle(val) {
        this.props.setTitle(val)
        if (val === 'Login' || val === 'Register') {
            this.props.changeLoginRegis(true)
        } else {
            this.props.changeLoginRegis(false)
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeLoginRegis: (params) => dispatch(changeLoginRegis(params)),
        setTitle: (params) => dispatch(setTitle(params)),
        doLogout: (params) => dispatch(doLogout(params))
    }
}

const mapStateToProps = (state) => {
    // alert(JSON.stringify(state.compoReducer))
    return {
        formLoginRegis: state.lapak.formLoginRegis,
        title: state.lapak.title,
        loginStatus: state.login.loginStatus
    }
}

var ConnectedComponent = connect(
    mapStateToProps, mapDispatchToProps
)(Navbar)

export default ConnectedComponent


// export default Navbar

