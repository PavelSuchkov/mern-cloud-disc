import express from 'express'
import mongoose from "mongoose"
import config from "config"
import authRouter from "./routes/authRoutes.js";

const PORT = config.get("serverPort")
const app = express()

app.use(express.json())
app.use("/api/auth", authRouter)

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