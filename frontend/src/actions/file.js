import axios from "axios";
import {addFile, setFiles} from "../reducers/fileReducer";

export const getFiles = (dirId) => {
  return async dispatch => {
      try{
          const response = await axios.get(`http://localhost:5010/api/files${dirId ? '?parent='+dirId : ''}`, {
              headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
          })
          dispatch(setFiles(response.data))
          console.log(response.data)
      }catch (e) {
          alert(e.response.data.message)
      }
  }
}

export const createDir = (dirId, name) => {
    return async dispatch => {
        try{
            const response = await axios.post(`http://localhost:5010/api/files`, {
                name,
                type: 'dir',
                parent: dirId
            },{
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(addFile(response.data))
            console.log(response.data)
        }catch (e) {
            alert(e.response.data.message)
        }
    }
}