import http from 'node:http'
import { getDataFromDB } from './database/db.js'
import sendJSONResponse from './utils/sendJSONResponse.js'

const PORT = 8000

const server = http.createServer(async (req, res) => {
    const destinations = await getDataFromDB()
    
    if (req.url === '/api') {
        if (req.method === 'GET') {
            sendJSONResponse(res, 200, destinations)
        }
    }
    else if (req.url.startsWith('/api/continent')) {
        if (req.method === 'GET') {
            const urlArr = req.url.split('/')
            const continent = urlArr.pop().toLowerCase()

            const filtered = destinations.filter(destination => destination.continent.toLowerCase() === continent)
            
            sendJSONResponse(res, 200, filtered)
        }
    }
    else {
        const errorPayload = {error: "not found", message: "The requested route does not exist"}
        sendJSONResponse(res, 404, errorPayload)
    }
    
})

server.listen(PORT, () => console.log(`server running on post ${PORT}`))
