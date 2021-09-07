import React from 'react'
import './calculator.css'
import Display from './Display/Display.jsx'
import Keypad from './Keypad/Keypad.jsx'

class Calculator extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            display: undefined,
            secondaryDisplay: undefined,
            inputNum: 0,
            firstInput: 0,
            secondInput: 0,
            operation: '',
            inputState: false
        }
    }
    inputNum = (num) => {
        let { display, inputState, firstInput, inputNum, operation } = this.state
        let input = 0
        if ( num === '.' && !display || num === '.' && inputNum.toString().includes('.') ) {
            return
        }
        if ( !display || inputNum === 0 ) {
            input = num
        } else {
            input = inputNum + num
        }
        if ( !inputState ) {
            this.setState({
                display: input,
                firstInput: input,
            })
        } else {
            this.setState({
                display: firstInput + operation + input,
                secondInput: input,
            })
        }
        this.setState({
            inputNum: input
        })
    }

    doMath = (first, second, func) => {
        let result = 0;
        first = +first
        second = +second
        switch (func) {
            case 'x':
                result = first * second
                break;
            case '/':
                result = first / second
                break;
            case '-':
                result = first - second
                break;
            case '+':
                result = first + second
            break;
        
            default:
                break;
        }
        return result;
    }

    inputFunc = ( func ) => {
        if ( func === '+/-' || func === '%' ) {
            return
        }
        let { display, firstInput, secondInput, operation, inputState, inputNum } = this.state
        let result = 0;
        let operations = ['x', '/', '+', '-']
        if ( func === '/' || func === 'x' || func === '+' || func === '-' ) {
                if ( inputState && secondInput  ) {
                    result = this.doMath(firstInput, secondInput, operation) 
                    this.setState({
                        display: result + func,
                        firstInput: result,
                        secondaryDisplay: display + '=',
                        inputNum: 0,
                        operation: func,
                        secondInput: 0
                    })
                } else {
                    this.setState({ 
                        operation: func,
                        display: firstInput + func,
                        inputState: true,
                        inputNum: 0
                    })
                }
        }
        switch ( func ) {
            case 'C': 
            if ( inputState ) {
                secondInput = secondInput.toString().slice(0, -1)
                if ( secondInput === '' ) {
                    this.setState({
                        inputState: false,
                    })
                }
                this.setState({
                    secondInput: secondInput
                })
            } else if ( !inputState && operation === '' ) {
                firstInput = firstInput.toString().slice(0, -1)
                this.setState({
                    inputNum: firstInput
                })
            }
                display = display.toString().slice(0,-1)
                if ( !this.contains(display, operations) ) {
                    this.setState({
                        operation: '',
                        inputState: false,
                    })
                }
                this.setState({
                    display: display
                })
            break;
            case 'AC': 
                this.setState({
                    display: undefined,
                    secondaryDisplay: undefined,
                    inputNum: 0,
                    firstInput: 0,
                    secondInput: 0,
                    operation: '',
                    inputState: false
                })
            break;
            case '=': 
            if ( operation !== '' ) {
                result = this.doMath(firstInput, secondInput, operation) 
                this.setState({
                    display: result,
                    firstInput: result,
                    secondaryDisplay: display + '=',
                    secondInput: 0,
                    inputNum: 0,
                    operation: '',
                    inputState: false
                })
            }
            break;
        default: break;
        }
    }
    contains = (target, pattern) => {
        var value = 0;
        pattern.forEach(function(word){
          value = value + target.includes(word);
        });
        return (value === 1)
    }
    render() {
        const { display, secondaryDisplay } = this.state
        const calcContainer = (
            <div className="calculator-container">
                <Display
                    display={display}
                    secondaryDisplay={secondaryDisplay}
                />
                <Keypad
                    inputNum={this.inputNum}
                    inputFunc={this.inputFunc}
                />
            </div>
        )
    return calcContainer
    }
}

export default Calculator