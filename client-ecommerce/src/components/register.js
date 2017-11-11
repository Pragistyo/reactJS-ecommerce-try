import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
// import axios from 'axios'
// import swal from 'sweetalert'
import '../App.css';
// import {
//     BrowserRouter as Router,
//     Route,
//     Link
// } from 'react-router-dom'
import { connect } from 'react-redux'
import { changeLoginRegis, register, setTitle } from '../actions/compoActions'


class Register extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            username: null,
            password: null,
            email: null
        }
    }

    render() {
        return (
            <div className="mdl-cell" align="center">
                <div className="mdl-cell mdl-cell--12-col mdl-cell--8-offset">
                    <form onSubmit={this.registerSubmit.bind(this)}>
                        <div className="mdl-textfield mdl-js-textfield">
                            <label className="mdl-textfield__label" htmlFor="inputText">Username...</label>
                            <input 
                            name="username"
                            onChange={this.onChange.bind(this)}
                            className="mdl-textfield__input" 
                            type="text" 
                            id="inputUsername" />
                        </div>
                        <div className="mdl-textfield mdl-js-textfield">
                            <label className="mdl-textfield__label" htmlFor="inputPass">Password...</label>
                            <input 
                            name="password"
                            onChange={this.onChange.bind(this)}
                            className="mdl-textfield__input" 
                            type="password" 
                            id="inputPass" />
                        </div>
                        <div className="mdl-textfield mdl-js-textfield">
                            <label className="mdl-textfield__label" htmlFor="inputEmail">Email...</label>
                            <input 
                            name="email"
                            onChange={this.onChange.bind(this)}
                            className="mdl-textfield__input" 
                            type="email" 
                            id="inputEmail" />
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

    componentDidMount() {
        this.props.myProp(true)
        this.props.setTitle('Register')
    }

    onChange(e) {
        const name = e.target.name
        this.setState({
            [name]: e.target.value
        })
    }

    registerSubmit(e) {
        e.preventDefault()
        console.log(e)
        // alert('register result' + JSON.stringify(this.state))
        this.props.register(this.state)
        // this.props.history.push('/')
        // this.props.myProp(false)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeLoginRegis: (params) => dispatch(changeLoginRegis(params)),
        register: (params) => dispatch(register(params)),
        setTitle: (params) => dispatch(setTitle(params))
    }
}

const mapStateToProps = (state) => {
    return {
        formLoginRegis: state.lapak.formLoginRegis
        // title: state.lapak.title,
    }
}

var ConnectedComponent = connect(
    mapStateToProps, mapDispatchToProps
)(Register)

export default withRouter(ConnectedComponent)


// export default withRouter(Register)
