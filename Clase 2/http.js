const http = require('node:http');

const desirePort = process.env.PORT ?? 3000;

const server = http.createServer((req, res) => {
    console.log("Request received!", req.url)
    res.end("Hello World")
})

server.listen(desirePort, () => {
    console.log(`Server listening on port ${desirePort}`);
})