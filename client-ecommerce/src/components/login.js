import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// import swal from 'sweetalert'
import '../App.css';
// import {
//     BrowserRouter as Router,
//     Route,
//     Link
// } from 'react-router-dom'
import { connect }from 'react-redux'
import { changeLoginRegis, login } from '../actions/compoActions'


class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: null,
            password: null
        }
    }

    render () {
        return (
            <div className="mdl-cell" align="center">
                <div className="mdl-cell mdl-cell--12-col mdl-cell--8-offset">
                    <form onSubmit={this.loginSubmit.bind(this)}>
                        <div className="mdl-textfield mdl-js-textfield">
                            <label className="mdl-textfield__label" htmlFor="inputText">Username...</label>
                            <input
                                onChange={this.onChange.bind(this)} 
                            name="username" 
                            className="mdl-textfield__input" 
                            type="text" 
                            id="inputUsername" />
                        </div>
                        <div className="mdl-textfield mdl-js-textfield">
                            <label className="mdl-textfield__label" htmlFor="inputPass">Password...</label>
                            <input 
                            onChange={this.onChange.bind(this)} 
                            name="password" 
                            className="mdl-textfield__input" 
                            type="password" id="inputPass"/>
                        </div><br/>
                        <button 
                            className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent "
                            >Submit
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    componentDidMount () {
        this.props.myProp(true)        
    }

    onChange (e) {
        const name = e.target.name
        this.setState({
            [name]:e.target.value
        })
    }

    loginSubmit (e) {
        e.preventDefault()
        console.log(e)
        // alert(JSON.stringify(this.state.username))
        this.props.login(this.state)
        // this.context.history.push('/'); 
        // this.props.history.push('/')
        this.props.myProp(false)
        // window.location.href='/'
        // this.context.router.transitionTo('/');
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeLoginRegis: (params) => dispatch(changeLoginRegis(params)),
        login: (params) => dispatch(login(params))
    }
}

const mapStateToProps = (state) => {
    // alert(JSON.stringify(state.lapak))
    return {
        formLoginRegis: state.lapak.formLoginRegis,
        title: state.lapak.title,
    }
}

var ConnectedComponent = connect(
    mapStateToProps, mapDispatchToProps
)(Login)

export default withRouter(ConnectedComponent)
