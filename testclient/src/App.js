import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      name: 'ogi'
    }
  }

  componentDidMount() {
    // this.changeName()
    // this.returnName()
    // this.changeName()
  }

  galihName() {
    var self = this
    self.setState({
      name: 'galih'
    })
    // console.log('====================================');
    // console.log(this.state);
    // console.log('====================================');
    // this.setState({ name: 'Hello' })
  }

  tamaName() {
    var self = this
    self.setState({
      name:'tama'
    })
    // console.log('====================================');
    // console.log(this.state);
    // console.log('====================================');
  }

  ogiName() {
    this.setState({
      name:'ogi'
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <h1>{this.state.name}</h1>
        <button
          onClick={this.galihName.bind(this)}
        >GALIH</button>
        <button
          onClick={this.tamaName.bind(this)}
        >TAMA
        </button>
        <button
        onClick={this.ogiName.bind(this)}
        >OGI
        </button>
      </div>
    );
  }
}

export default App;
