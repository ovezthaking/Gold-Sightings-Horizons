import path from "node:path"

const serveStatic = (baseDir) => {
    const filePath = path.join(baseDir, 'public', 'index.html')
    console.log(filePath)
}

export default serveStatic
