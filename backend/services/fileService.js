import fs from 'fs'
import config from "config";

class FileService {

    createDir(file) {
        const filePath = `${config.get('filePath')}/${file.user}/${file.path}`
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
}


export default new FileService()