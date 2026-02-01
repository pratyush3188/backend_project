import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

// CORS
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))

// Body parsers should ALWAYS come BEFORE routes
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

// Static files (public folder)
app.use(express.static("public"))

// Cookies
app.use(cookieParser())

// Routes (multer lives here)
import userRouter from './routes/user.routes.js'
app.use('/api/v1/users', userRouter)

export { app }
