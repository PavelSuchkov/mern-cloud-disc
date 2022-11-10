import React from 'react';
import './input.scss'

const Input = (props) => {
    return (
        <input type={props.type} placeholder={props.placeholder}/>
    );
};

export default Input;