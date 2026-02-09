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
    
}
