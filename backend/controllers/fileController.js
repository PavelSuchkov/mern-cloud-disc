import fileService from "../services/fileService.js";
import File from "../models/file.js";
import User from "../models/user.js";
import config from "config";
import fs from "fs";
import {v4} from "uuid";

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
            const {sort} = req.query
            let files
            switch (sort) {
                case 'name':
                    files = await File.find({user: req.user.id, parent: req.query.parent}).sort({name: 1})
                    break
                case 'type':
                    files = await File.find({user: req.user.id, parent: req.query.parent}).sort({type: 1})
                    break
                case 'date':
                    files = await File.find({user: req.user.id, parent: req.query.parent}).sort({date: 1})
                    break
                default:
                    files = await File.find({user: req.user.id, parent: req.query.parent}) // user id получен из токена
                    break
            }
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
            if (fs.existsSync(path)) {
                return res.status(400).json({message: 'Upload error. File already exist'})
            }
            file.mv(path)

            const type = file.name.split('.').pop()
            let filePath = file.name
            if (parent) {
                filePath = parent.path + '/' + file.name
            }
            const dbFile = new File({
                name: file.name,
                type,
                size: file.size,
                path: filePath,
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

    async downloadFile(req, res) {
        try {
            const file = await File.findOne({_id: req.query.id, user: req.user.id})
            const path = fileService.getPath(file)
            if (fs.existsSync(path)) {
                return res.download(path, file.name)
            }
            return res.status(400).json({message: 'Download error'})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: 'Download error'})
        }
    }

    async deleteFile(req, res) {
        try {
            const file = await File.findOne({_id: req.query.id, user: req.user.id})
            if (!file) {
                return res.status(400).json({message: 'File not found'})
            }
            fileService.deleteFile(file)
            await file.remove()
            return res.json({message: 'File was deleted'})
        } catch (error) {
            res.status(500).json({message: 'Dir is not empty'})
            console.log(error)
        }
    }

    async searchFile(req, res) {
        try {
            const searchName = req.query.search
            let files = await File.find({user: req.user.id})
            files = files.filter(file => file.name.includes(searchName))
            return res.json(files)
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: 'Search error'})
        }
    }

    async uploadAvatar(req, res) {
        try {
            const file = req.files.file
            const user = await User.findById(req.user.id)
            const avatarName = v4() + '.jpg'
            file.mv(config.get('staticPath') + '/' + avatarName)
            user.avatar = avatarName
            await user.save()
            return res.json(user)

        } catch (e) {
            console.log(e)
            return res.status(500).json({message: 'Upload error'})
        }
    }

    async deleteAvatar(req, res) {
        debugger
        try {
            const user = await User.findById(req.user.id)
            fs.unlinkSync(config.get('staticPath') + '/' + user.avatar)
            user.avatar = null
            await user.save()
            return res.json(user)
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: 'Delete avatar error'})
        }
    }

}


export default new FileController()