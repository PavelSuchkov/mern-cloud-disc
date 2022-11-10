import React, {useState} from 'react';
import './authorization.scss'
import Input from "../../utils/input/Input";
import {login} from "../../actions/user";
import {useDispatch} from "react-redux";

export const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    return (
        <div className='authorization'>
            <div className="authorization__header">Login</div>
            <Input value={email} setValue={setEmail} type="text" placeholder="enter email"/>
            <Input value={password} setValue={setPassword} type="password" placeholder="enter password"/>
            <button className="authorization__btn" onClick={() => dispatch(login(email, password))}>Enter</button>
        </div>
    );
};
