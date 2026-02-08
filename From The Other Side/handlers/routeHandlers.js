import getData from "../utils/getData.js"
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
