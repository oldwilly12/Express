const http = require('node:http');

const desirePort = process.env.PORT ?? 3000;

const processRequest = (req, res) => {
    if (req.url === "/") {
        res.setHeader("Content-type", "text/html; charset=utf-8");
        res.end("Bienvenido a mi pagina de inicio");
    } else if (req.url === "/contacto") {
        res.setHeader("Content-type", "text/html; charset=utf-8");
        res.end('<h1>Contacto</h1>');
    } else {
        res.statusCode = 404;
        res.setHeader("Content-type", "text/html; charset=utf-8");
        res.end("<h1>404</h1>")
    }
    
}

const server = http.createServer(processRequest);

server.listen(desirePort, () => {
    console.log(`Server listening on port ${desirePort}`);
})