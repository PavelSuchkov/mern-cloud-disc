import React from 'react';
import './file.scss'
import dirLogo from '../../../../assets/img/dirLogo.svg'
import fileLogo from '../../../../assets/img/fileLogo.svg'

export const File = ({file}) => {
    return (
        <div className='file'>
            <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="" className="file__img"/>
            <div className="file__name">{file.name}</div>
            <div className="file__date">{file.date.slice(0, 10)}</div>
            <div className="file__size">{file.size}</div>
        </div>
    );
};
