import axios from "axios";
import {addFile, deleteFileAction, setFiles} from "../reducers/fileReducer";

export const getFiles = (dirId) => {
    return async dispatch => {
        try {
            const response = await axios.get(`http://localhost:5010/api/files${dirId ? '?parent=' + dirId : ''}`, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(setFiles(response.data))
            // console.log(response.data)
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}

export const createDir = (dirId, name) => {
    return async dispatch => {
        try {
            const response = await axios.post(`http://localhost:5010/api/files`, {
                name,
                type: 'dir',
                parent: dirId
            }, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(addFile(response.data))
            // console.log(response.data)
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}

export const uploadFile = (file, dirId) => {
    return async dispatch => {
        try {
            const formData = new FormData()
            formData.append('file', file)
            if (dirId) {
                formData.append('parent', dirId)
            }
            const response = await axios.post(`http://localhost:5010/api/files/upload`, formData, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                onUploadProgress: progressEvent => {
                    if (true) {
                        let progress = Math.round((progressEvent.loaded / progressEvent.total) * 100)
                        // console.log('progress ', progress)
                    }
                }
            })
            dispatch(addFile(response.data))
            console.log(response.data)
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}

export const downloadFile = async (file) => {
    const response = await fetch(`http://localhost:5010/api/files/download?id=${file._id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    if(response.status === 200){
        const blob = await response.blob()
        const downloadUrl = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = downloadUrl
        link.download = file.name
        document.body.appendChild(link)
        link.click()
        link.remove()
    }
}

export const deleteFile = (file) => {
    return async dispatch => {
        try {
            const response = await axios.delete(`http://localhost:5010/api/files?id=${file._id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            // console.log('response.data ',response.data)
            dispatch(deleteFileAction(file._id))
            alert(response.data.message)
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}

