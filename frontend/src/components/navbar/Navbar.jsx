import React, {useState} from 'react';
import './navbar.scss'
import Logo from '../../assets/img/navbar-logo.svg'
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../reducers/userReducer";
import {getFiles, searchFiles} from "../../actions/file";
import {showLoader} from "../../reducers/appReducer";
import avatarLogo from "../../assets/img/avatar.svg"
import {API_URL} from "../../config";

const Navbar = () => {

    const isAuth = useSelector(state => state.user.isAuth)
    const currentDir = useSelector(state => state.files.currentDir)
    const currentUser = useSelector(state => state.user.currentUser)

    // console.log(currentUser)
    const dispatch = useDispatch()
    const [searchName, setSearchName] = useState('')
    const [searchTimeOut, setSearchTimeOut] = useState(false)
    const avatar = currentUser.avatar ? `${API_URL + currentUser.avatar}` : avatarLogo

    const searchChangeHandler = (e) => {
        setSearchName(e.target.value)
        dispatch(searchFiles(e.target.value))
        if (searchTimeOut) {
            clearTimeout(searchTimeOut)
        }
        dispatch(showLoader())
        if (e.target.value !== '') {
            setSearchTimeOut(setTimeout((vallue) => {
                dispatch(searchFiles(vallue))
            }, 500, e.target.value))
        } else {
            dispatch(getFiles(currentDir))
        }
    }

    return (
        <div className='navbar'>
            <div className="container">
                <img src={Logo} alt="" className='navbar__logo'/>
                <div className='navbar__header'>MERN CLOUD</div>
                {isAuth && <input
                    value={searchName}
                    onChange={(e) => searchChangeHandler(e)}
                    type="text"
                    className='navbar__search'
                    placeholder='name of file'

                />}

                {!isAuth && <div className="navbar__login"><NavLink to="/login">Login</NavLink></div>}
                {!isAuth &&
                    <div className="navbar__registration"><NavLink to="/registration">Registration</NavLink></div>}
                {isAuth && <div className="navbar__login" style={{cursor: "pointer"}}
                                onClick={() => dispatch(logout())}>Logout</div>}
                {isAuth &&
                    <NavLink to='/profile'>
                        <img className='navbar__avatar' src={avatar} alt=''/>
                    </NavLink>
                }
            </div>
        </div>
    );
};

export default Navbar;