import express, { RequestHandler } from 'express'
import cors from 'cors'
import createRouter from './routes/createRouter'
import connectToMongoDB from './utils/connectToMongoDB'
import users from './data/users.json'
import fs from 'fs';
import a from '../common'
console.log(a)

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

const userRouter = createRouter({
    '/:userId-get': {
        controller: (req, res) => res.json(users.find((user: any) => user.id === req.params.userId)),
        // controllerData: {
        //     StorageClass: {},
        //     methodData: {
        //         customMethod: () => Promise.resolve('Shubham')
        //     },
        // },
        idParamName: 'userId'
    },
    '/:userId-post': {
        controller: (req, res) => {
            fs.writeFileSync('./src/data/users.json', JSON.stringify([...users, req.body.user]), 'utf-8')
            res.json(req.body.user)
        },
        // controllerData: {
        //     StorageClass: {},
        //     methodData: {
        //         customMethod: () => Promise.resolve('Shubham Tandsle')
        //     },
        // },
        idParamName: 'userId'
    },
    '/:userId-patch': {
        controller: (req, res) => {
            let u;
            fs.writeFileSync(
                './src/data/users.json',
                JSON.stringify(users.map((user: any) => {
                    if (user.id === req.params.userId) {
                        u = { ...user, ...req.body.user }
                        return u
                    }
                    return user
                })),
                'utf-8'
            )
            res.json(u)
        },
    },
    '/:userId-delete': {
        controller: (req, res) => {
            fs.writeFileSync('./src/data/users.json', JSON.stringify(users.filter((user: any) => user.id !== req.params.userId)), 'utf-8')
            res.json({})
        },
        // controllerData: {
        //     StorageClass: {},
        //     methodData: {
        //         customMethod: () => Promise.resolve('Shubham Tandsle')
        //     },
        // },
        idParamName: 'userId'
    },
})

const usersRouter = createRouter({
    '/-get': {
        controller: (req, res) => res.json(users)
    }
})

app.use('/api/user', userRouter);
app.use('/api/users', usersRouter);

app.listen(PORT, () => {
    console.log(`App is listening on PORT ${PORT}`);
})