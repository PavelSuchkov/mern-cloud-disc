import React from 'react';
import './fileList.scss'
import {useSelector} from "react-redux";
import {File} from "./file/File";

export const FileList = () => {

    const files = useSelector(state => state.files.files.map(file => <File key={file._id} file={file}/>))

    return (
        <div className='fileList'>
            <div className="fileList__header">
                <div className="fileList__name">File name</div>
                <div className="fileList__date">Created</div>
                <div className="fileList__size">Size</div>
            </div>
            {files}
        </div>
    );
};
