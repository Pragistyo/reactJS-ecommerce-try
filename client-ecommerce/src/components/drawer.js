import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
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
                    <a className="mdl-navigation__link" href="">Link</a>
                    <a className="mdl-navigation__link" href="">Link</a>
                    <a className="mdl-navigation__link" href="">Link</a>
                    <a className="mdl-navigation__link" >Logout</a>
                </nav>
            </div>
        )
    }
}

export default Drawer