import getData from "../utils/getData.js"
import parseJSONBody from "../utils/parseJSONBody.js"
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
    const rawBody = await parseJSONBody(req)

    console.log(rawBody)
}
