import React from 'react';
import './uploader.scss'
import {UploadFile} from "./UploadFile";
import {useDispatch, useSelector} from "react-redux";
import {hideUploader} from "../../../reducers/uploadReducer";

export const Uploader = () => {

    const files = useSelector(state => state.upload.files)
    // const files = [{id: 1, name: 'file', progress: 0}, {id: 2, name: 'file 2', progress: 30}]

    const isVisible = useSelector(state => state.upload.isVisible)

    const dispatch = useDispatch()

    return ( isVisible &&
        <div className='uploader'>
            <div className="uploader__header">
                <div className="uploader__title">Downloads</div>
                <button className="uploader__close" onClick={() => dispatch(hideUploader())}>X</button>

            </div>
            {files.map(file => <UploadFile key={file.id} file={file}/>
            )}
        </div>
    );
};
