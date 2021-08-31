import React from 'react'

const Keypad = (props) => {
    const { inputNum, inputFunc } = props
    let keypadArray = [['AC', '+/-', '%', '/'], ['7', '8', '9', 'x'], ['4', '5', '6', '+'], ['1', '2', '3', '-'], ['0', '.', 'C', '=']]
    const printKey = (key) => {
        if( inputNum ) {
            props.inputNum(key)
        }
    }
    const doFunc = (func) => {
        if ( inputFunc ) {
            props.inputFunc(func)
        }
    }
    let num = (number) => {
        let keys = number.map((num, index) => (
            <div className={"keypad-num" + " " + "key" + index} key={index}>
                <span onClick={ !isNaN(num) || num === '.' ? () => printKey(num) : () => doFunc(num)}>{num}</span>
            </div>
        ))
        return keys
    }
    let keypadNum = keypadArray.map((number, index) => (
        <div className={"keypad-row" + " " + "row" + index} key={index}>
            {num(number)}
        </div>
    ))
    const keypad = (
        <div className="keypad-container">
            <div className="numpad-container">
            {keypadNum}
            </div>
        </div>
    )
    return keypad
}

export default Keypad