import express, { RequestHandler } from 'express'
import createRouter from './routes/createRouter'
import connectToMongoDB from './utils/connectToMongoDB'

const app = express();
const PORT = process.env.PORT || 8080;

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

const userRouter = createRouter({
    '/:userId-get': {
        // controller: (req, res) => res.send('Hello from user get')
        controllerData: {
            StorageClass: {},
            methodData: {
                customMethod: () => Promise.resolve('Shubham')
            },
        },
        idParamName: 'userId'
    },
    '/:userId-post': {
        // controller: (req, res) => res.send('Hello from user get')
        controllerData: {
            StorageClass: {},
            methodData: {
                customMethod: () => Promise.resolve('Shubham Tandsle')
            },
        },
        idParamName: 'userId'
    },
})

app.use('/user', userRouter);

app.listen(PORT, () => {
    console.log(`App is listening on PORT ${PORT}`);
})