import React, {useState} from 'react';
import './authorization.scss'
import Input from "../../utils/input/Input";
import {registration} from "../../actions/user";

export const Registration = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div className='authorization'>
            <div className="authorization__header">Registration</div>
            <Input value={email} setValue={setEmail} type="text" placeholder="enter email"/>
            <Input value={password} setValue={setPassword} type="password" placeholder="enter password"/>
            <button className="authorization__btn" onClick={() => registration(email, password)}>Register</button>
        </div>
    );
};
