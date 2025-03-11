import express, { json } from 'express'; // require --> commonJS
import { moviesRouter } from './routes/movies';

import cors from 'cors';



// como leer un json en ESModules
// import fs from 'node:fs';
// const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8'));

// como leer un json en ESModules
import { createRequire } from 'node:module';
import { corsMiddleware } from './middlewares/cors';
const require = createRequire(import.meta.url);
const movies = require('./movies.json');

const app = express();

app.use(json());
app.use(corsMiddleware());
app.disable('x-powered-by');

// metodos normales: GET/HEAD/POST
// metodos complejos: PUT/PATCH/DELETE

// CORS PRE-Flight
// OPTIONS



app.use('/movies', moviesRouter); // cuando accedo a /movies me va a responder con todas las rutas de moviesRouter

app.options('movies/:id', (req, res) => {
    const origin = req.header('origin');
    // cuando la peticion es del msimo ORIGIN
    if( ACCEPTED_ORIGINS.includes(origin) || !origin) {
        res.header('Access-Control-Allow-Origin', origin); // * todos los origenes que esten permitidos
        res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    }
    res.send(200)
})

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`);
})