import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {createDir, getFiles} from "../../actions/file";
import {FileList} from "./fileList/FileList";
import './disk.scss'
import Popup from "./Popup";
import {setPopupDisplay} from "../../reducers/fileReducer";

export const Disk = () => {

    const dispatch = useDispatch()

    const currentDir = useSelector(state => state.files.currentDir)
    
    const showPopupHandler = () => {
      // dispatch(createDir(currentDir, 'asasas'))
        dispatch(setPopupDisplay('flex'))
    }

    useEffect(() => {
        dispatch(getFiles(currentDir))
    }, [])
    return (
        <div className='disk'>
            <div className="disk__btns">
                <button className="disk__back">Back</button>
                <button className="disk__create" onClick={() => showPopupHandler()}>Create folder</button>
            </div>
            <FileList/>
            <Popup/>
        </div>
    );
};
