import { Express } from 'express'
import { v4 as uuidv4 } from 'uuid'
import path from 'path';
import fs from 'fs'
import { createFolderIfNotExist } from '../file-system';
import registerRouters from './registerRouters'

const projectsFolderPath = path.resolve(__dirname, '..', 'projects')

const projectRouter = (app: Express) => {
  app.post('/api/create-project', async (req, res, next) => {
    const { data: { projectName = '' } = {} } = req.body;
    await createFolderIfNotExist(projectsFolderPath);
    if (!projectName) {
      return next(new Error('No project name specified...'))
    }
    const id = uuidv4();
    const projectId = `${projectName}-${id}`;
    const projectFolderPath = path.join(projectsFolderPath, projectId);
    if (fs.existsSync(projectFolderPath)) {
      next(new Error('Project already exists...'))
    }
    fs.mkdirSync(projectFolderPath)
    res.json({ projectId, message: 'Project created successfully...' })
  });

  app.get('/api/projects', async (req, res, next) => {
    const projects = fs.readdirSync(projectsFolderPath);
    res.json(projects)
  });

  app.get('/api/project/:projectId', async (req, res, next) => {
    const { projectId = '' } = req.params
    if (!projectId) {
      return next(new Error('No project id provided...'))
    }
    if (!fs.existsSync(path.join(projectsFolderPath, projectId))) {
      return next(new Error('Invalid project id...'))
    }
    res.json(projectId)
  });

  app.get('/api/project/artifacts/:projectId', async (req, res, next) => {
    const { projectId = '' } = req.params
    if (!projectId) {
      return next(new Error('No project id provided...'))
    }
    const projectFolderPath = path.join(projectsFolderPath, projectId)
    if (!fs.existsSync(projectFolderPath)) {
      return next(new Error('Invalid project id...'))
    }
    const files = fs.readdirSync(projectFolderPath)
    res.json(files)
  });

  app.get('/api/project/artifacts/:projectId/:artifactName', async (req, res, next) => {
    const { projectId = '', artifactName = '' } = req.params
    if (!projectId || !artifactName) {
      return next(new Error('No project id or artifact name provided...'))
    }
    const projectFolderPath = path.join(projectsFolderPath, projectId)
    if (!fs.existsSync(projectFolderPath)) {
      return next(new Error('Invalid project id...'))
    }
    const artifactFilePath = path.join(projectsFolderPath, projectId, `${artifactName}.js`)
    if (!fs.existsSync(artifactFilePath)) {
      return next(new Error('Invalid artifact name...'))
    }
    const content = await import(artifactFilePath);
    res.json(content.default)
  });

  app.post('/api/create-artifact/:projectId', (req, res, next) => {
    const { projectId = '' } = req.params;
    if (!projectId) {
      return next(new Error('No project id provided...'))
    }
    if (!fs.existsSync(path.join(projectsFolderPath, projectId))) {
      return next(new Error('Invalid project id...'))
    }
    const { name: artifactName } = req.body;
    const artifactTemplate = `const ${artifactName}Data = ${JSON.stringify(req.body)};\nmodule.exports = ${artifactName}Data;`
    try {
      fs.writeFileSync(path.join(projectsFolderPath, projectId, `${artifactName}.js`), artifactTemplate, 'utf-8')
      registerRouters(app)
      res.json(artifactTemplate)
    } catch (error) {
      next(error);
    }
  })
}


export default projectRouter