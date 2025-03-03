const express = require('express'); //importar framework de express
const app = express(); // crear app de express

const PORT = process.env.PORT ?? 3000;

app.disable('x-powered-by');

// Lina de codigo igual al Middleware de abajo
app.use(express.json());

//MIDDLEWARE
// app.use((req,res, next) => {
//     console.log('mi primer middleware');
//     if (req.method != 'POST') return next();
//     if (req.headers['content-type'] != 'application/json') return next();
//     // solo llega request que son POST y que tienen un header content-type application/json
//     let body = '';

//     req.on('data', chunk => {
//         body += chunk.toString();
//     })

//     req.on('end', () => {
//         const data = JSON.parse(body);
    

//         data.timestamp = Date.now();
//         // mutar la request y meter la infomracion rn el req.body
//         req.body = data;
        
//     next();
//     })

// })


app.get('/', (req, res) => { // cuando la app recive un get con esta ruta, se ejecuta la siguiente funion
    res.send('<h1>Bienvenido a mi pagina de inicio</h1>');
})

app.post('/pokemon', (req, res) => {
    //la info viene del middleware creado arriba
    res.status(201).send(req.body);
})

app.use((req, res) => { //use dentro de app.use es como decir no import metodo si no lo encuentras usa lo siguiente
    res.status(404).send('<h1>404</h1>');
})

app.listen(PORT, ()=> {
    console.log(`Server listening on port http://localhost:${PORT}`);
})