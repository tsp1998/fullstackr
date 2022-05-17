import express, { RequestHandler, ErrorRequestHandler } from 'express'
import cors from 'cors'
import connectToMongoDB from './db/connectToMongoDB'
import fs from 'fs'
import path from 'path'
import routersGenerator from './routes/routersGenerator'

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

// app.use('/api/user', userRouter);
// app.use('/api/users', usersRouter);

const registerRouters = () => {
    const artifactsFolderPath = path.resolve(__dirname, 'artifacts')
    const files = fs.readdirSync(artifactsFolderPath);
    files.forEach(file => {
        if (file.endsWith('.js')) {
            import(path.join(artifactsFolderPath, file)).then(content => {
                const { default: artifactData } = content;
                if (artifactData && artifactData.name) {
                    const routers = routersGenerator(artifactData)
                    routers.forEach(router => {
                        app.use(`/api${router.path}`, router.router)
                    })
                }
            })
        }
    })
}

registerRouters()

app.use(((error: Error, req, res, next) => {
    const statusCode = (error as any).statusCode || 404
    const errorMessage = error.message || 'Something went wrong.';
    res.status(statusCode).json({
        status: 'error',
        message: errorMessage,
        stack: error.stack
    })
}) as ErrorRequestHandler)

connectToMongoDB({ local: true, MONGO_DB_NAME: 'fullstackr' }).then(disconnectFunction => {
    console.log('connected to database');
}).catch(error => {
    console.log(`error`, error)
})

app.listen(PORT, () => {
    console.log(`App is listening on PORT ${PORT}`);
})