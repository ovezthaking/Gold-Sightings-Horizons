import http from 'node:http'
import { getDataFromDB } from './database/db.js'

const PORT = 8000

const server = http.createServer(async (req, res) => {
    const destinations = await getDataFromDB()
    
    if (req.url === '/api') {
        if (req.method === 'GET') {
            res.setHeader('Content-Type', 'application/json')
            res.statusCode = 200
            res.end(JSON.stringify(destinations))
        }
    }
    else if (req.url.startsWith('/api/continent')) {
        if (req.method === 'GET') {
            const urlArr = req.url.split('/')
            const continent = urlArr.pop().toLowerCase()

            const filtered = destinations.filter(destination => destination.continent.toLowerCase() === continent)
            res.setHeader('Content-type', 'application/json')
            res.statusCode = 200
            
            res.end(JSON.stringify(filtered))
        }
    }
    else {
        res.setHeader('Content-Type', 'application/json')
        res.statusCode = 404
        res.end(JSON.stringify({error: "not found", message: "The requested route does not exist"}))
    }
    
})

server.listen(PORT, () => console.log(`server running on post ${PORT}`))
