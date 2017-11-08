import React, { Component } from 'react'
import axios from 'axios'
import swal from 'sweetalert'
import './App.css'
import Commerce from './components/commerce.js'
import Drawer from './components/drawer.js'
import Navbar from './components/navbar.js'
import Checkout from './components/checkout.js'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { 
  getAllItem, 
  changeLoginRegis
 } from './actions/compoActions'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
        products: [],
        cart: [],
        cartFront: [],
        history: [],
        totalPrice: 0
    }
  }

  render() {
    return (
      
      <Router>
        <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
          <Navbar></Navbar>
          <Drawer></Drawer>
          <Commerce></Commerce>
          {/* <main className="mdl-layout__content">
            <div className="page-content">
              <h3 className="" align="center">{this.props.title}</h3>
              <hr />                
                <div className="mdl-grid">
                  <Checkout myProp={[this.state.totalPrice,this.state.cart]}></Checkout>
                  <div className="mdl-cell--9-col">
                    <div className="mdl-grid">
                      <Route 
                      exact path="/"
                      render={props => this.props.allItem.map(item=>{
                        return <Compo key={item._id} nama={item} receiveDataCart={this.receiveData.bind(this)}/>
                      })}
                      />
                      <Route
                        path="/login"
                        render={props => <Login myProp={this.setFormLoginRegis.bind(this)} />}
                      />
                      <Route
                        path="/register"
                        render={props => <Register myProp={this.setFormLoginRegis.bind(this)} />}
                      />
                    </div>
                  </div>
                  <br/>
                </div>
            </div>
          </main> */}
        </div>
      </Router>
    );
  }

  ComponentDidMount() {
    this.allProducts.call(this)
  }

  allProducts () {
    axios.get(`http://localhost:3000/`) //Link nya si mongo
    .then( result => {  //result array of object
      this.setState({
        products: result
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

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

  sidebarView () {
    if (!this.props.formLoginRegis) {
      return <div className="mdl-cell--3-col">
        <h3>Your Shopping Cart:</h3><hr />
        <p>Total Price: Rp. {this.state.totalPrice},-</p>
        <p>Total Item: {this.state.cart.length}</p>
        <p>Item Cart: </p>
        {this.itemChosen.call(this)}
        <button
          className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
          onClick={this.activateLasers.bind(this)}>
          CHECKOUT
        </button>
      </div>
    } else {
      return <div className="mdl-cell--2-col"></div>
    }
  }

  itemChosen () {
    if (this.state.cart.length !== 0) {
      return <div>
          <table>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
        {this.state.cartFront.map(item => {
          return <tbody>
              <tr>
                <td>{item.name}</td>
                <td>{item.quantity} pc(s)</td>
                <td>Rp. {item.price},-</td>
              </tr>
          </tbody>
        })}
        </table>
      </div>
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllItem: () => dispatch(getAllItem()),
    changeLoginRegis: (params) => dispatch(changeLoginRegis(params))
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