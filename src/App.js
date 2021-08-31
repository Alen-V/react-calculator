import React from 'react'
import './App.css';
import Calculator from './components/Calculator.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    const calculator = (
         <Calculator/>
    )
    return calculator
  }
}

export default App;
