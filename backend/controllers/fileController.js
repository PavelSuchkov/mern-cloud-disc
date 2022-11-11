import fileService from "../services/fileService.js";
import File from "../models/file.js";


class FileController {

    async createDir(req, res) {
        try {
            const {name, type, parent} = req.body
            const file = new File({name, type, parent, user: req.user.id}) // user.id получаем из парсинга токена в authMiddleware
            const parentFile = await File.findOne({_id: parent})
            if (!parentFile) {
                file.path = name                                // если парент не был найден, файл будет добавлен в корневую директорию
                await fileService.createDir(file)               // поэтому в поле path добавляем только имя файла и создаем директорию
            } else {
                file.path = `${parentFile.path}/${file.name}`   //если парент файл есть, то добавляем родительский путь + имя файла
                await fileService.createDir(file)
                parentFile.childs.push(file._id)                // добавляем этот файл в массив чайлдов
                await parentFile.save()
            }
            await file.save()
            return res.json(file)
        } catch (e) {
            console.log(e)
            return res.status(400).json(e)
        }
    }
    async fetchFiles(req, res){
        try{
            const files = await File.find({user: req.user.id, parent: req.query.parent}) // user id получен из токена
            return res.json(files)
        }catch (e) {
            console.log(e)
            return res.status(500).json({message: 'Can not get files'})
        }
    }
}



export default new FileController()