import React, {useState} from 'react';
import './disk.scss'
import {useDispatch, useSelector} from "react-redux";
import {setPopupDisplay} from "../../reducers/fileReducer";
import {createDir} from "../../actions/file";

const Popup = () => {

    const [dirName, setDirname] = useState('')

    const popupDisplay = useSelector(state => state.files.popupDisplay)

    const currentDir = useSelector(state => state.files.currentDir)

    const dispatch = useDispatch()

    const createHandler = () => {
        dispatch(createDir(currentDir, dirName))
        setDirname('')
        dispatch(setPopupDisplay('none'))
    }

    return (
        <div className='popup' style={{display: popupDisplay}} onClick={() => dispatch(setPopupDisplay('none'))}>
            <div className="popup__content" onClick={(event => event.stopPropagation())}>
                <div className="popup__header">
                    <div className="popup__title">Create new folder</div>
                    <button className="popup__close" onClick={() => dispatch(setPopupDisplay('none'))}>X</button>
                </div>
                <input type="text" placeholder='Enter name of new folder' value={dirName} onChange={e => setDirname(e.target.value)}/>
                <button className='popup__crete' onClick={() => createHandler()}>Create</button>
            </div>
        </div>
    );
};

export default Popup;