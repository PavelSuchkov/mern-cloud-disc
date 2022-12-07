import React from 'react';
import './file.scss'
import dirLogo from '../../../../assets/img/dirLogo.svg'
import fileLogo from '../../../../assets/img/fileLogo.svg'
import remove from '../../../../assets/img/remove.svg'
import download from '../../../../assets/img/download.svg'
import {useDispatch, useSelector} from "react-redux";
import {pushToStack, setCurrentDir} from "../../../../reducers/fileReducer";
import {deleteFile, downloadFile} from "../../../../actions/file";
import sizeFormat from "../../../../utils/sizeFormat";

export const File = ({file}) => {

    const dispatch = useDispatch()

    const currentDir = useSelector(state => state.files.currentDir)
    const fileView = useSelector(state => state.files.view)

    const openDirHandler = (file) => {
        if (file.type === 'dir') {
            dispatch(pushToStack(currentDir))
            dispatch(setCurrentDir(file._id))
        }
    }

    const downloadClickHandler = (event) => {
        event.stopPropagation()
        downloadFile(file)
    }

    const deleteClickHandler = (event) => {
        event.stopPropagation()
        dispatch(deleteFile(file))
    }

    if (fileView === 'list') {
        return (
            <div className='file' onClick={() => openDirHandler(file)}>
                <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="" className="file__img"/>
                <div className="file__name">{file.name}</div>
                <div className="file__date">{file.date.slice(0, 10)}</div>
                <div className="file__size">{sizeFormat(file.size)}</div>
                {file.type !== 'dir' &&
                    <img
                        src={download}
                        className="file__btn file__download"
                        onClick={(event) => downloadClickHandler(event)}/>}
                <img src={remove} className="file__btn file__delete" onClick={(event) => deleteClickHandler(event)}/>
            </div>
        );
    }

    if (fileView === 'plate') {
        return (
            <div className='file-plate' onClick={() => openDirHandler(file)}>
                <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="" className="file-plate__img"/>
                <div className="file-plate__name">{file.name}</div>
                <div className="file-plate__btns">
                    {file.type !== 'dir' &&
                        <img
                            src={download}
                            className="file-plate__btn file__download"
                            onClick={(event) => downloadClickHandler(event)}/>
                    }
                    <img src={remove} className="file-plate__btn file__delete"
                         onClick={(event) => deleteClickHandler(event)}/>
                </div>

            </div>
        );
    }

};
