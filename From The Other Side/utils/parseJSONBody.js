const parseJSONBody = async (req) => {
    let body = ''

    try {
        for await (const chunk of req) {
            body += chunk
        }
        
        return JSON.parse(body)
    } catch (err) {
        throw new Error(`Invalid JSON format: ${err}`)
    }
}


export default parseJSONBody
