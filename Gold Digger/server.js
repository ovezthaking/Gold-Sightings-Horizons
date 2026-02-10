import http from 'node:http'
import serveStatic from './utils/serveStatic.js'
import { handlePost, handlePrice } from './handlers/routeHandlers.js'
import sendResponse from './utils/sendResponse.js'
import getData from './utils/getData.js'


const PORT = 8000
const __dirname = import.meta.dirname

const server = http.createServer(async (req, res) => {
    if (req.url === '/api'){
        if (req.method === 'POST') {
            return await handlePost(req, res)
        }
        else if (req.method === 'GET') {
            await getData()
        }
        else {
            sendResponse(res, 404, 'application/json', JSON.stringify(
                {error: 'Method not allowed'}
            ))
        }
    }
    else if (req.url === '/api/price') {
        return await handlePrice(req, res)
    }
    else if (req.url.startsWith('/api')) {
        sendResponse(res, 404, 'application/json', JSON.stringify(
                {status: res.statusCode, error: 'Not found'}))
    }
    else if (!req.url.startsWith('/api')) {
        serveStatic(req, res, __dirname)
    }
})

server.listen(PORT, () => console.log(`PORT: ${PORT}`))
