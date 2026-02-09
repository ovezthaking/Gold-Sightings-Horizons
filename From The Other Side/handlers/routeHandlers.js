import { sightingEvents } from "../events/sightingEvents.js"
import addNewSighting from "../utils/addNewSighting.js"
import getData from "../utils/getData.js"
import parseJSONBody from "../utils/parseJSONBody.js"
import sanitizeInput from "../utils/sanitizeInput.js"
import sendResponse from "../utils/sendResponse.js"

export const handleGet = async (res) => {
    try {
        const data = await getData()
    
        sendResponse(res, 200, 'application/json', JSON.stringify(data))
    } catch (err) {
        console.error(err)
        sendResponse(res, 500, 'application/json', JSON.stringify({error: 'Server Error'}))
    }
}

export const handlePost = async (req, res) => {

    try {
        const parsedBody = await parseJSONBody(req)
        const sanitizedBody = sanitizeInput(parsedBody)
        
        await addNewSighting(sanitizedBody)

        sightingEvents.emit('sighting-added', sanitizedBody)

        sendResponse(res, 201, 'application/json', JSON.stringify(parsedBody))
    } catch (err) {
        sendResponse(res, 400, 'application/json', JSON.stringify({error: err}))
    } 
}
