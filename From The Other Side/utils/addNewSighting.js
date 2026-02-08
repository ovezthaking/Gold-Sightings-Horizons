import fs from 'node:fs/promises'
import path from 'node:path'
import getData from './getData.js'

const addNewSighting = async (newSighting) => {
    
    try {
        const parsedData = await getData()
        parsedData.push(newSighting)
        
        const newData = JSON.stringify(parsedData, null, 2)
        return await fs.writeFile(path.join('data', 'data.json'), newData, 'utf8')
    } catch (err) {
        throw new Error('Error posting new sighting: ', err)
    }
}


export default addNewSighting
