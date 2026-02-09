import http from 'node:http'
import serveStatic from './utils/serveStatic.js'
import { handleGet, handleNews, handlePost } from './handlers/routeHandlers.js'

const PORT = 8000

const __dirname = import.meta.dirname

const server = http.createServer(async (req, res) => {


    if (req.url === '/api') {
        if (req.method === 'GET') {
            return await handleGet(res)
        }
        else if (req.method === 'POST') {
            return await handlePost(req, res)
        }
        else {
            res.statusCode = 404
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({status: res.statusCode, error: 'Method not allowed'}))
        }
    }
    else if (req.url === '/api/news') {
        return await handleNews(req, res)
    }
    else if (req.url.startsWith('/api')) {
        res.statusCode = 404
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({status: res.statusCode, error: 'Not found'}))
    }
    else if (!req.url.startsWith('/api')) {
        return await serveStatic(req, res, __dirname)
    }
    
})

server.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`)
})
