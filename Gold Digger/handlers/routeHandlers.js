import parseReqBody from "../utils/parseReqBody.js"
import sendResponse from "../utils/sendResponse.js"
import addNewOrder from "../utils/addNewOrder.js"

export const handlePrice = async (req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')

    const basePrice = 3694

    setInterval(() => {
        let randomDecimals = Math.round((Math.random()-0.5)*80)/100

        let finalPrice = basePrice + randomDecimals

        res.write(
            `data: ${JSON.stringify({
                event: 'price-update',
                price: finalPrice
            })}\n\n`
        )
    },2000)
}


export const handlePost = async (req, res) => {
    try {
        const parsedBody = await parseReqBody(req)
        await addNewOrder(parsedBody)

        sendResponse(res, 201, 'application/json', JSON.stringify(parsedBody))
    } catch (err) {
        sendResponse(res, 400, 'application/json', JSON.stringify({ error: err }))
    }
}
