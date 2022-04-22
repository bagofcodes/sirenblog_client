import React from 'react'
import './heading.css'

export default function Headings(props) {
    return (
        <div className='headings'>
            {/* {this.props.heading} */}

            <span className='headingText'>{props.heading}</span>
            <div className='headlingLine'></div>
        </div>
    )
}
