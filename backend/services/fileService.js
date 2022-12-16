import fs from 'fs'
import config from "config";

class FileService {

    createDir(req, file) {
        const filePath = this.getPath(req, file)
        return new Promise(((resolve, reject) => {
            try {
                if (!fs.existsSync(filePath)) {                             // если файл по такому пути не существует
                    fs.mkdirSync(filePath)                                  // тогда мы созддаём папку
                    return resolve({message: 'File was created'})
                } else {
                    return reject({message: 'File already exist'})  // реджект в случае когда файл по такому пути
                }                                                          // уже существует
            } catch (e) {
                return reject({message: 'File error'})
            }
        }))
    }

    deleteFile(req, file) {
        const path = this.getPath(req, file)
        if (file.type === 'dir') {
            fs.rmdirSync(path)
        } else {
            fs.unlinkSync(path)
        }
    }

    getPath(req, file) {
        return req.filePath + '/' + file.user + '/' + file.path;
    }
}


export default new FileService()