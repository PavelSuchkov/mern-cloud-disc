import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {createDir, getFiles, uploadFile} from "../../actions/file";
import {FileList} from "./fileList/FileList";
import './disk.scss'
import Popup from "./Popup";
import {setCurrentDir, setPopupDisplay} from "../../reducers/fileReducer";
import {Uploader} from "./uploader/Uploader";

export const Disk = () => {

    const dispatch = useDispatch()

    const currentDir = useSelector(state => state.files.currentDir)
    const dirStack = useSelector(state => state.files.dirStack)

    const [dragEnter, setDragEnter] = useState(false)

    const showPopupHandler = () => {
        dispatch(setPopupDisplay('flex'))
    }

    const backClickHandler = () => {
        const backDirId = dirStack.pop()
        dispatch(setCurrentDir(backDirId))
    }
    const fileUploadHandler = (event) => {
        const files = [...event.target.files]
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
    }

    const DragEnterHandler = (event) => {
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(true)
    }

    const DragLeaveHandler = (event) => {
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(false)
    }

    const dropHandler = (event) => {
        event.preventDefault()
        event.stopPropagation()
        let files = [...event.dataTransfer.files]
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
        setDragEnter(false)
    }

    useEffect(() => {
        dispatch(getFiles(currentDir))
    }, [currentDir])

    return (!dragEnter ?
            <div className='disk'
                 onDragEnter={(event) => DragEnterHandler(event)}
                 onDragLeave={(event) => DragLeaveHandler(event)}
                 onDragOver={(event) => DragEnterHandler(event)}
            >
                <div className="disk__btns">
                    <button className="disk__back" onClick={() => backClickHandler()}>Back</button>
                    <button className="disk__create" onClick={() => showPopupHandler()}>Create folder</button>
                    <div className="disk__upload">
                        <label htmlFor="disk__upload-input" className="disk__upload-label">Upload file</label>
                        <input multiple={true} onChange={(event) => fileUploadHandler(event)} type="file"
                               id="disk__upload-input" className="disk__upload-input"/>
                    </div>
                </div>
                <FileList/>
                <Popup/>
                <Uploader/>
            </div>
            :
            <div className='drop-area'
                 onDragEnter={(event) => DragEnterHandler(event)}
                 onDragLeave={(event) => DragLeaveHandler(event)}
                 onDragOver={(event) => DragEnterHandler(event)}
                 onDrop={dropHandler}
            >
                Drag files here
            </div>
    );
};
