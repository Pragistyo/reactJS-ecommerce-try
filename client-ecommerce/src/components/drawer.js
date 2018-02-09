import React, { Component } from 'react';
import { connect } from 'react-redux'
import { 
    changeLoginRegis, 
    setTitle, 
    doLogout, 
    getCategory, 
    getAllItem 
} from '../actions/generalAction'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect
} from 'react-router-dom'


class Drawer extends Component {
    constructor(props) {
        super(props)
    }

    render () {
        return (
            <div className="mdl-layout__drawer">
                <div>
                    <img src="https://uberflip.cdntwrk.com/files/aHViPTYwNjg3JmNtZD1pdGVtZWRpdG9yaW1hZ2UmZmlsZW5hbWU9aXRlbWVkaXRvcmltYWdlXzU3NDMxMzU2NGNlNmYucG5nJnZlcnNpb249MDAwMCZzaWc9ZDRiYmEzMjEzZjc3MjcxZmM1NmM0ZTcxNTYwOWRhMGU%253D" alt=" Drawer" />
                    <span className="mdl-layout-title">Menu</span>
                </div>
                <nav className="mdl-navigation">
                    {this.drawerLogin.call(this)}
                </nav>
            </div>
        )
    }

    drawerLogin () {
        if (!this.props.loginStatus.status) {
            return (
                <div>
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
                </div>
            )
        } else if (this.props.loginStatus.status) {
            return (
                <div>
                    <Link
                        to='/'
                        className="mdl-navigation__link"
                        onClick={this.logoutMethod.bind(this)}
                    >Logout
                    </Link>
                </div>
            )
        }
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

    logoutMethod() {
        // alert('localstorage clear')
        localStorage.clear()
        this.props.doLogout()
        return <Redirect to="/login" />
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
)(Drawer)

export default ConnectedComponent


// export default Drawer