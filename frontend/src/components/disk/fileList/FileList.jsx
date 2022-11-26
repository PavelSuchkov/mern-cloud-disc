import React from 'react';
import './fileList.scss'
import {useSelector} from "react-redux";
import {File} from "./file/File";
import {CSSTransition, TransitionGroup} from "react-transition-group";

export const FileList = () => {

    const files = useSelector(state => state.files.files)

    return (
        <div className='fileList'>
            <div className="fileList__header">
                <div className="fileList__name">File name</div>
                <div className="fileList__date">Created</div>
                <div className="fileList__size">Size</div>
            </div>
            <TransitionGroup>
                {files.map(file =>
                    <CSSTransition
                        key={file._id}
                        timeout={500}
                        classNames={'file'}
                        exit={false}
                    >
                        <File file={file}/>
                    </CSSTransition>
                )}
            </TransitionGroup>
        </div>
    );
};
