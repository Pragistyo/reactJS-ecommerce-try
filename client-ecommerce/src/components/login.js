import React, { Component } from 'react';
// import axios from 'axios'
// import swal from 'sweetalert'
import '../App.css';
// import {
//     BrowserRouter as Router,
//     Route,
//     Link
// } from 'react-router-dom'


class Compo extends Component {
    // constructor(props) {
    //     super(props)
    // }

    render () {
        return (
            <div className="mdl-cell" align="center">
                <div className="mdl-cell mdl-cell--12-col mdl-cell--8-offset">
                    <form onSubmit={this.loginSubmit}>
                        <div className="mdl-textfield mdl-js-textfield">
                            <label className="mdl-textfield__label" htmlFor="inputText">Username...</label>
                            <input className="mdl-textfield__input" type="text" id="inputUsername" />
                        </div>
                        <div className="mdl-textfield mdl-js-textfield">
                            <label className="mdl-textfield__label" htmlFor="inputPass">Password...</label>
                            <input className="mdl-textfield__input" type="password" id="inputPass"/>
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
    
    loginSubmit (e) {
        e.preventDefault()
        console.log(e)
        alert(e)
    }

}

export default Compo;
