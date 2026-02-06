import http from 'node:http'
import { getDataFromDB } from './database/db.js'
import sendJSONResponse from './utils/sendJSONResponse.js'
import getDataByPathParams from './utils/getDataByPathParams.js'
import getDataByQueryParams from './utils/getDataByQueryParams.js'

const PORT = 8000

const server = http.createServer(async (req, res) => {
    const destinations = await getDataFromDB()

    const urlObj = new URL(req.url, `http://${req.headers.host}`)

    const queryObj = Object.fromEntries(urlObj.searchParams)
    
    
    if (urlObj.pathname === '/api') {
        if (req.method === 'GET') {
            let filteredData = getDataByQueryParams(destinations, queryObj)

            sendJSONResponse(res, 200, filteredData)
        }
    }
    else if (req.url.startsWith('/api/continent')) {
        if (req.method === 'GET') {
            const urlArr = req.url.split('/')
            const continent = urlArr.pop()

            const filtered = getDataByPathParams(destinations, 'continent', continent)
            
            sendJSONResponse(res, 200, filtered)
        }
    }
    else if (req.url.startsWith('/api/country')) {
        if (req.method === 'GET') {
            const country = req.url.split('/').pop()
            const filtered = getDataByPathParams(destinations, 'country', country)

            sendJSONResponse(res, 200, filtered)
        }
    }
    else {
        const errorPayload = {error: "not found", message: "The requested route does not exist"}
        sendJSONResponse(res, 404, errorPayload)
    }
    
})

server.listen(PORT, () => console.log(`server running on post ${PORT}`))
