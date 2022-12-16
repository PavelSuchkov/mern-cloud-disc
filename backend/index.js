import express from 'express'
import mongoose from "mongoose"
import config from "config"
import authRouter from "./routes/authRoutes.js";
import corsMiddleware from "./middleware/cors.middleware.js";
import filepathMiddleware from "./middleware/filepath.middleware.js";
import fileRouter from "./routes/fileRoutes.js";
import fileUpload from 'express-fileupload'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


const PORT = process.env.PORT || config.get("serverPort")
const app = express()

app.use(fileUpload({}))
app.use(corsMiddleware)
app.use(filepathMiddleware(path.resolve(__dirname, 'files')))
app.use(express.json())
app.use(express.static('static'))
app.use("/api/auth", authRouter)
app.use("/api/files", fileRouter)

const start = async () => {
    try {
        await mongoose.connect(config.get("dbUrl"))
        app.listen(PORT, () => {
            console.log('server starts on port ', PORT)
        })
    }catch (e) {
        console.log(e)
    }
}
start()