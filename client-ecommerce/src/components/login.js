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
import { 
    changeLoginRegis, 
    login, 
    setTitle 
} from '../actions/generalAction'


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
            <div className="mdl-cell " align="center">
                <div className="mdl-cell mdl-cell--12-col mdl-cell--8-offset ">
                    <div className="demo-card-square mdl-card mdl-shadow--2dp">
                    {/* <form onSubmit={this.loginSubmit.bind(this)}> */}
                    <form onSubmit={(e) => this.loginSubmit(e, this.props.history.push('/'))}>
                        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label ">
                            <label className="mdl-textfield__label" htmlFor="input_username_login">Username...</label>
                            <input
                            onChange={this.onChange.bind(this)} 
                            name="username" 
                            className="mdl-textfield__input" 
                            type="text" 
                            id="input_username_login" />
                        </div>
                        <div className="mdl-textfield mdl-js-textfield">
                            <label className="mdl-textfield__label" htmlFor="inputPass">Password...</label>
                            <input 
                            onChange={this.onChange.bind(this)} 
                            name="password" 
                            className="mdl-textfield__input" 
                            type="password" id="input_password_login"/>
                        </div><br/>
                        <button 
                            className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent "
                            >Submit
                        </button>
                    </form>
                    </div>
                </div>
            </div>
        );
    }
    
    componentDidMount () {
        this.props.myProp(true)
        this.props.setTitle('Login')
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
        this.props.login(this.state)
        // this.context.history.push('/'); 
        this.props.history.push('/')
        this.props.myProp(false)
        this.props.setTitle('All Item')
        // window.location.href='/'
        // this.context.router.transitionTo('/');
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeLoginRegis: (params) => dispatch(changeLoginRegis(params)),
        login: (params) => dispatch(login(params)),
        setTitle: (params) => dispatch(setTitle(params))
    }
}

const mapStateToProps = (state) => {
    // alert(JSON.stringify(state.lapak))
    return {
        formLoginRegis: state.lapak.formLoginRegis
        // title: state.lapak.title,
    }
}

var ConnectedComponent = connect(
    mapStateToProps, mapDispatchToProps
)(Login)

export default withRouter(ConnectedComponent)
