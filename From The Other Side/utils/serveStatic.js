import path from "node:path"
import fs from 'node:fs/promises'
import sendResponse from "./sendResponse.js"
import getContentType from "./getContentType.js"

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
        console.error('Error', err)
        if (err.code === 'ENOENT') {
            const filePath = path.join(publicDir, '404.html')
            const content = await fs.readFile(filePath)

            sendResponse(res, 404, 'text/html', content)
        }
        else {
            sendResponse(res, 500, 'text/html', 
                `<html><h1>Server Error: ${err.code}</h1></html>`
            )
        }
    }
}

export default serveStatic
