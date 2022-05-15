import express, { RequestHandler, ErrorRequestHandler } from 'express'
import cors from 'cors'
import connectToMongoDB from './utils/connectToMongoDB'
import {userRouter, usersRouter} from './routes/userRouter'

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to Express App');
})

const doubleNameMiddleware: RequestHandler = (req, res, next) => {
    const { name } = req.body;
    req.body.name = name + name;
    next()
}

const tripleNameMiddleware: RequestHandler = (req, res, next) => {
    const { name } = req.body;
    req.body.name = name + name + name;
    next()
}

app.use('/api/user', userRouter);
app.use('/api/users', usersRouter);


app.use(((error: Error, req, res, next) => {
    const statusCode = (error as any).statusCode || 404
    const errorMessage = error.message || 'Something went wrong.';
    res.status(statusCode).json({
        status: 'error',
        message: errorMessage,
        stack: error.stack
    })
}) as ErrorRequestHandler)

app.listen(PORT, () => {
    console.log(`App is listening on PORT ${PORT}`);
})