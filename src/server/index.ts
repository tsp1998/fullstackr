import express, { RequestHandler, ErrorRequestHandler } from 'express'
import cors from 'cors'
// import connectToMongoDB from './db/connectToMongoDB'
import fs from 'fs'
import path from 'path'
import routersGenerator from './routes/routersGenerator';
import projectRoutes from './routes/project.routes'

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to FullStackr App');
})

app.use('/api', projectRoutes)

const registerRouters = () => {
    const projectsFolderPath = path.resolve(__dirname, 'projects')
    const folders = fs.readdirSync(projectsFolderPath);
    folders.forEach(folder => {
        const id = folder.slice(folder.indexOf('-') + 1)
        const files = fs.readdirSync(path.join(projectsFolderPath, folder));
        files.forEach(file => {
            if (file.endsWith('.js')) {
                import(path.join(projectsFolderPath, folder, file)).then(content => {
                    const { default: artifactData } = content;
                    if (artifactData && artifactData.name) {
                        const routers = routersGenerator(artifactData)
                        routers.forEach(router => {
                            app.use(`/api/${id}${router.path}`, router.router)
                        })
                    }
                })
            }
        })
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

// connectToMongoDB({ local: true, MONGO_DB_NAME: 'fullstackr' }).then(disconnectFunction => {
//     console.log('connected to database');
// }).catch(error => {
//     console.log(`error`, error)
// })

app.listen(PORT, () => {
    console.log(`App is listening on PORT ${PORT}`);
})