import fs from 'fs'
export const createFolderIfNotExist = (path: string): Promise<boolean> => new Promise((resolve, reject) => {
  fs.exists(path, (exists) => {
    if (!exists) {
      fs.mkdir(path, (error) => {
        if (error) { return reject(error); }
        resolve(true);
      })
    } else {
      resolve(false)
    }
  })
})