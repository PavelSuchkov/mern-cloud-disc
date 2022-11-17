import React from 'react';
import './fileList.scss'
import {useSelector} from "react-redux";
import {File} from "./file/File";

export const FileList = () => {

    const files = useSelector(state => state.files.files.map(file => <File key={file.id} file={file}/>))
    console.log(files)
    // const files =
    //     [
    //     {_id:1, name: 'direct 1', type: 'dir', size: '3gb', date: '12.12.2022'},
    //     {_id:2, name: 'direct 2', type: 'directory', size: '5gb', date: '20.12.2022'}].map(file => <File file={file} key={file.id}/>)

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
