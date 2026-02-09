import fs from 'node:fs/promises'
import path from 'node:path'
import getContentType from './getContentType.js'
import sendResponse from './sendResponse.js'

const serveStatic = async (req, res, baseDir) => {
    const publicDir = path.join(baseDir, 'public')
    const filePath = path.join(
        publicDir,
        req.url === '/' ? 'index.html' : req.url
    )

    try {
        const content = await fs.readFile(filePath)
        const ext = path.extname(filePath)
        const contentType = getContentType(ext)

        sendResponse(res, 200, contentType, content)
    } catch (err) {
        console.error('Error: ', err)
        if (err.code === 'ENOENT') {
            const filePath = path.join(publicDir, '404.html')
            const content = await fs.readFile(filePath, 'utf-8')

            sendResponse(res, 404, 'text/html', content)
        }
        else {
            sendResponse(res, 500, 'application/json', JSON.stringify(
                {status: res.statusCode, error: 'Server Error'}))
        }
    }
}

export default serveStatic
