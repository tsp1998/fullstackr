//@ts-nocheck
const fs = require('fs')
const googlDriveServices = require('../services/google-drive.services/googleDrive.service')

exports.uploadFile = async (req, res, next) => {
    try {
        if (!req.file) {
            throw new Error('No file found')
        }
        const result = await googlDriveServices.uploadFile(req.file)
        if (result.statusText !== 'OK') {
            throw new Error('Something went wrong while uploading file to drive')
        }

        try {
            fs.unlink(req.file.path, (error) => {
                if (error) {
                    throw new Error(error)
                }
            })
        } catch (error) {
            console.log(`error`, error)
        }

        try {
            const linksResult = await googlDriveServices.generatePublicUrl(result.data.id)
            const links = linksResult.data
            if (links && links.webContentLink) {
                result.data.url = links.webContentLink
            }
        } catch (error) {
            console.log(`error`, error)
        }

        delete result.data.kind
        delete result.data.name
        res.json({
            status: 'success',
            file: result.data
        })
    } catch (error) {
        next(error)
    }
}

exports.getFileLink = async (req, res, next) => {
    try {
        const {fileId} = req.params
        if (!fileId) {
            throw new Error('No file id provided')
        }
        const result = await googlDriveServices.generatePublicUrl(fileId)
        if (result.statusText !== 'OK') {
            throw new Error('Something went wrong while uploading file to drive')
        }
        res.json({
            status: 'success',
            links: result.data
        })
    } catch (error) {
        next(error)
    }
}