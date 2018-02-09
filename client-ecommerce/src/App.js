import React, { Component } from 'react'
import axios from 'axios'
// import swal from 'sweetalert'
import './App.css'
import Commerce from './components/commerce.js'
import Drawer from './components/drawer.js'
import Navbar from './components/navbar.js'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { 
  getAllItem, 
  changeLoginRegis,
  verify,
  setTitle
 } from './actions/generalAction'


class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Router>
        <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
          <Navbar></Navbar>
          <Drawer></Drawer>
          <Commerce></Commerce>
        </div>
      </Router>
    );
  }

  componentWillMount() {
    this.props.setTitle('All Item')
    this.props.getAllItem()
    if (localStorage.token) {
      this.props.verify(localStorage.token)
    }
  }

  // ComponentDidMount() {
  //   this.props.getAllItem()
  // }

  itemCategory (key) {
    axios.get(`http://localhost:3000/category/${key}`) //link mongo
    .then(result => { //array of object
      this.setState({
        products: result
      })
    })
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllItem: () => dispatch(getAllItem()),
    changeLoginRegis: (params) => dispatch(changeLoginRegis(params)),
    verify: (params) => dispatch(verify(params)),
    setTitle: (params) => dispatch(setTitle(params))
  }
}

const mapStateToProps = (state) => {
  // alert(JSON.stringify(state.lapak))
  return {
    formLoginRegis: state.lapak.formLoginRegis,
    allItem: state.lapak.allItem,
    title: state.lapak.title
  }
}

var ConnectedComponent = connect(
  mapStateToProps, mapDispatchToProps
)(App)

export default ConnectedComponent

// export default App;