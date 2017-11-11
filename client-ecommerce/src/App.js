import React, { Component } from 'react'
import axios from 'axios'
import swal from 'sweetalert'
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
  verify
 } from './actions/compoActions'


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

  receiveData (product) {
    this.alertCartFront.call(this,product.objItem)
    this.setState({
      cart: [...this.state.cart, product.objItem._id],
    })
    // ALERT STRING
    let arr = [product.objItem.name,product.msg]
    let alertStr = arr.join(', ')
    swal(`${alertStr}`, 'You Add This Item to Cart','success')
  }

  alertCartFront (product) {
    if (!product.quantity) {
      product.quantity = 0
    }
    var produkidx = this.state.cartFront.findIndex(item => {
      return item._id === product._id
    })
    if (produkidx === -1) {
      product.quantity += 1
      this.setState({
        cartFront: [...this.state.cartFront, product]
      }, () => {
        this.calculatePrice.call(this)
    })
  } else {
      const cartFront = [...this.state.cartFront]
      cartFront[produkidx].quantity = product.quantity + 1 
      this.setState({
        cartFront
      })
      // this.state.cartFront[produkidx].quantity = product.quantity + 1 
      alert('produk ' + JSON.stringify(this.state.cartFront))
      this.calculatePrice.call(this)
    }
  }

  calculatePrice () {
    let total = 0;
    if (this.state.cartFront.length > 0) {
      this.state.cartFront.forEach(item => {
        let calc = item.price * item.quantity
        total += calc
      })
    } else {
      total = 0
    }
    this.setState({
      totalPrice: total
    })
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllItem: () => dispatch(getAllItem()),
    changeLoginRegis: (params) => dispatch(changeLoginRegis(params)),
    verify: (params) => dispatch(verify(params))
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