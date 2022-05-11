//@ts-nocheck
import express, { Request, Response, } from 'express'
import cors from 'cors'
import connectToMongoDB from './utils/connectToMongoDB'
import createListRouter from './routes/list.routes'
import createItemRouter from './routes/item.routes'
import userMiddlewares from './middlewares/user.middlewares'
import authMiddlewares from './middlewares/auth.middlewares'
import User from './models/User'
import * as errors from './errors'
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())
app.get('/', (req, res, next) => {
    res.json({ message: 'Hello from google-drive-files api!!' })
})

app.use('/api', require('./routes/auth.routes'))
app.use('/api/google-drive', require('./routes/googlDrive.routes'))
app.use('/api/categories', require('./routes/categories.routes'))
app.use('/api/sub-categories', require('./routes/subCategories.routes'))
app.use('/api/users', createListRouter('users', { default: User }))
app.use('/api/user', createItemRouter(
    'user',
    { default: User },
    {
        '/user_post': [userMiddlewares.usernameModifier],
        '/user_delete': [authMiddlewares.requiresAdminAuth]
    }
))

app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 404
    const errorMessage = errors.transformErrorMessage(error) || 'Something went wrong.';
    res.status(statusCode).json({
        status: 'error',
        message: errorMessage,
        stack: error.stack
    })
})

app.listen(5000, (error: Error) => {
    if (error) { return console.log(`Error: `, error) }
    console.log(`Listening on port 5000`)
    connectToMongoDB()
})