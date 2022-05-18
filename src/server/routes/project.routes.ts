import { Router } from 'express'
import { v4 as uuidv4 } from 'uuid'
import path from 'path';
import fs from 'fs'
import { createFolderIfNotExist } from '../file-system';

const router = Router()
const projectsFolderPath = path.resolve(__dirname, '..', 'projects')

router.post('/create-project', async (req, res, next) => {
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

router.get('/projects', async (req, res, next) => {
  const projects = fs.readdirSync(projectsFolderPath);
  res.json(projects)
});

router.get('/project/:projectId', async (req, res, next) => {
  const { projectId = '' } = req.params
  if (!projectId) {
    return next(new Error('No project id provided...'))
  }
  if (!fs.existsSync(path.join(projectsFolderPath, projectId))) {
    return next(new Error('Invalid project id...'))
  }
  res.json(projectId)
});

router.post('/create-artifact/:projectId', (req, res, next) => {
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
    res.json(artifactTemplate)
  } catch (error) {
    next(error);
  }
})

export default router;