import fs from 'fs/promises'
import path from 'node:path'

const addNewOrder = async (newOrder) => {
    const amount = parseFloat(newOrder.amount)
    const currentPrice = parseFloat(newOrder.currentPrice)
    const ounces = (amount/currentPrice).toFixed(4)
    const timestamp = new Date().toISOString()
    
    const order = `${timestamp}, amount paid: £${amount}, price per Oz: ${currentPrice}, gold sold: ${ounces} Oz\n`

    try {
        return await fs.appendFile(path.join('data', 'purchases.txt'), order, 'utf8')
    } catch (err) {
        console.error('err ', err)
        throw new Error('Error posting new order: ', err)
    }
}

export default addNewOrder