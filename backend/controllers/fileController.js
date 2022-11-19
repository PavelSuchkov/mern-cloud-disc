import fileService from "../services/fileService.js";
import File from "../models/file.js";
import User from "../models/user.js";
import config from "config";
import fs from "fs";
// import path from 'path'

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

    async getFiles(req, res) {
        try {
            const files = await File.find({user: req.user.id, parent: req.query.parent}) // user id получен из токена
            return res.json(files)
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: 'Can not get files'})
        }
    }

    async uploadFile(req, res) {
        try {
            const file = req.files.file
            const parent = await File.findOne({user: req.user.id, _id: req.body.parent})
            const user = await User.findOne({_id: req.user.id})

            if (user.usedSpace + file.size > user.diskSpace) {
                return res.status(400).json({message: 'There is no space on the disk'})
            }
            user.usedSpace += file.size

            let path;
            if (parent) {
                path = `${config.get('filePath')}/${user._id}/${parent.path}/${file.name}`
            } else {
                path = `${config.get('filePath')}/${user._id}/${file.name}`
            }
            if(fs.existsSync(path)){
                return res.status(400).json({message: 'Upload error. File already exist'})
            }
            file.mv(path)

            const type = file.name.split('.').pop()
            const dbFile = new File({
                name: file.name,
                type,
                size: file.size,
                path: parent?.path,
                parent: parent?._id,
                user: user._id
            })
            await dbFile.save()
            await user.save()
            res.json(dbFile)
        } catch (error) {
            console.log(error)
            return res.status(400).json({message: 'Upload error'})
        }
    }
}


export default new FileController()