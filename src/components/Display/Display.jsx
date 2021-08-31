import React from 'react'

const Display = (props) => {
    const { display, secondaryDisplay } = props
    const displayContainer = (
        <div className="display-container">
            <span>{!secondaryDisplay ? null : secondaryDisplay}</span>
            <span>{display !== 0 ? display : null}</span>
        </div>
    )
    return displayContainer
}

export default Display