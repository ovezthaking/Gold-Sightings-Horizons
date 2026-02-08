import path from "node:path"
import fs from "node:fs/promises"

const getData = async () => {
    const pathtoData = path.join('data', 'data.json')

    try {
        const data = await fs.readFile(pathtoData, 'utf8')
        const parsedData = JSON.parse(data)

        return parsedData
    } catch (err) {
        console.log(err)

        return new Array
    }
}

export default getData
