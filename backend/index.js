import express from 'express'
import mongoose from "mongoose"
import config from "config"
import authRouter from "./routes/authRoutes.js";
import corsMiddleware from "./middleware/cors.middleware.js";
import fileRouter from "./routes/fileRoutes.js";
import fileUpload from 'express-fileupload'

const PORT = config.get("serverPort")
const app = express()

app.use(fileUpload({}))
app.use(corsMiddleware)
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