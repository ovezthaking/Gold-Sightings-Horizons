import fs from 'node:fs/promises'
import path from 'node:path'
import getData from './getData.js'
import { v4 as uuid } from 'uuid'

const addNewSighting = async (newSighting) => {
    
    try {
        const parsedData = await getData()
        newSighting.uuid = uuid()
        parsedData.push(newSighting)
        
        const newData = JSON.stringify(parsedData, null, 2)
        return await fs.writeFile(path.join('data', 'data.json'), newData, 'utf8')
    } catch (err) {
        throw new Error('Error posting new sighting: ', err)
    }
}


export default addNewSighting
