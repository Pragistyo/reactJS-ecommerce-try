import React, { Component } from 'react'
import '../index.css'
import { connect } from 'react-redux'
import { changeLoginRegis, setTitle, doLogout, getCategory, getAllItem } from '../actions/compoActions'
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
                <div className="">
                    <img src={logo} className="App-logo" alt="logo" />
                </div>
                <div className="">
                    <span className="mdl-layout-title logo">Ecommerce</span>
                </div>
                <Link
                    className="mdl-navigation__link"
                    to="/"
                    onClick={this.changeTitle.bind(this, 'All Item') }
                >All Item
                </Link>
                <nav className="mdl-navigation">
                    <p id="submenu" className="categoryClick mdl-navigation__link">Category</p>
                </nav>
                <ul className="mdl-menu mdl-menu--bottom-left mdl-js-menu mdl-js-ripple-effect"
                    htmlFor="submenu">
                    <Link 
                    onClick={this.props.getCategory.bind(this,'phone')}
                    to="/category/phone" className="mdl-menu__item">Phone</Link>
                    <Link 
                    onClick={this.props.getCategory.bind(this, 'tablet')}
                    to="/category/tablet" className="mdl-menu__item">Tablet</Link>
                    <Link 
                    onClick={this.props.getCategory.bind(this, 'watch')}
                    to="/category/watch" className="mdl-menu__item">Watch</Link>
                </ul>

                <div className="mdl-layout-spacer"></div>
                {this.buttonLog.call(this)}
            </div>
        </header>
        )
    }

    ComponentWillMount () {
    }

    onCategory (title) {
        this.props.getCategory.bind(this, title)
        this.changeTitle.bind(this, title)
    }

    buttonLog () {
        if (!this.props.loginStatus.status) {
            return <nav className="mdl-navigation">
                <Link
                    className="mdl-navigation__link"
                    to="/login"
                    // onClick={this.changeTitle.bind(this, 'Login')}
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
            return <nav>
                <Link
                    className="mdl-navigation__link"
                    onClick={this.logoutMethod.bind(this)}
                    to='/'
                    >
                    LOGOUT
                </Link>
            </nav>
        }
    }

    logoutMethod () {
        // alert('localstorage clear')
        localStorage.clear()
        this.props.doLogout()
        return <Redirect push to="/login" />
    }

    changeTitle(val) {
        this.props.setTitle(val)
        if (val === 'Login' || val === 'Register') {
            this.props.changeLoginRegis(true)
            this.props.getAllItem()
        } else {
            this.props.changeLoginRegis(false)
            this.props.getAllItem()
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeLoginRegis: (params) => dispatch(changeLoginRegis(params)),
        setTitle: (params) => dispatch(setTitle(params)),
        doLogout: (params) => dispatch(doLogout(params)),
        getCategory: (params) => dispatch(getCategory(params)),
        getAllItem: (params) => dispatch(getAllItem(params))
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

