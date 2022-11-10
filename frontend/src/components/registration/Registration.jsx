import React, {useState} from 'react';
import './registration.scss'
import Input from "../../utils/input/Input";

export const Registration = () => {

    const [email, setEmail] = useState('')

    return (
        <div className='registration'>
            <div className="registration__header">Registration</div>
            <Input type="text" placeholder="enter email"/>
            <Input type="password" placeholder="enter password"/>
            <button className="registration__btn">Enter</button>
        </div>
    );
};
