import fs from 'node:fs/promises'
import path from 'node:path'

const getData = async () => {
    const pathtoData = path.join('data', 'purchases.txt')

    try {
        const content = await fs.readFile(pathtoData, 'utf8')
        
        const contentArray = content.split('\n')
        if (!contentArray[-1]) contentArray.pop()
        
        let OrderArray = []
    
        for (const info of contentArray) {
            const infoArray = info.split(',')
            
            const timestamp = infoArray.shift()
            
            let responseArray = []
    
            for (const value of infoArray) {
                const valueArray = value.split(':')
                valueArray.shift()
                
                const valueText = valueArray.join(',')
                responseArray.push(valueText)
            }
    
            OrderArray.push({
                timestamp,
                amountPaid: responseArray[0],
                pricePerOz: responseArray[1],
                goldSold: responseArray[2],
            })
        }
        return OrderArray
    } catch (err) {
        console.error('Error: ', err)
        throw new Error('Error getting data: ', err)
    }
}


export default getData
