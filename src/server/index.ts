import express, { RequestHandler, ErrorRequestHandler } from 'express'
import cors from 'cors'
// import connectToMongoDB from './db/connectToMongoDB'
import registerRouters from './routes/registerRouters'
import projectRouter from './routes/project.routes'

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to FullStackr App');
})

projectRouter(app);
registerRouters(app);

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