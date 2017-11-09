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


class Register extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="mdl-cell" align="center">
                <div className="mdl-cell mdl-cell--12-col mdl-cell--8-offset">
                    <form onSubmit={this.registerSubmit.bind(this)}>
                        <div className="mdl-textfield mdl-js-textfield">
                            <label className="mdl-textfield__label" htmlFor="inputText">Username...</label>
                            <input className="mdl-textfield__input" type="text" id="inputUsername" />
                        </div>
                        <div className="mdl-textfield mdl-js-textfield">
                            <label className="mdl-textfield__label" htmlFor="inputPass">Password...</label>
                            <input className="mdl-textfield__input" type="password" id="inputPass" />
                        </div>
                        <div className="mdl-textfield mdl-js-textfield">
                            <label className="mdl-textfield__label" htmlFor="inputEmail">Email...</label>
                            <input className="mdl-textfield__input" type="email" id="inputEmail" />
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
    }

    registerSubmit(e) {
        e.preventDefault()
        console.log(e)
        alert(e)
        this.props.history.push('/')
        this.props.myProp(false)
    }

}

export default withRouter(Register)
