import { Express } from 'express'
import path from 'path'
import fs from 'fs'
import routersGenerator from './routersGenerator';

const registerRouters = (app: Express) => {
    const projectsFolderPath = path.resolve(__dirname, '..', 'projects')
    if (!fs.existsSync(projectsFolderPath)) {
        return;
    }
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

export default registerRouters