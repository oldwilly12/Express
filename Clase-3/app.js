const express = require('express'); // require --> commonJS
const crypto = require('node:crypto');
const movies = require('./movies.json');
const cors = require('cors');
const { validateMovie } = require('./schemas/moves');

const app = express();

app.use(express.json);
app.use(cors({
    origin: (origin, callback) => {
        const ACCEPTED_ORIGINS = [
            'http://localhost:3000',
            'http://localhost:8000',
            'http://localhost:8080',
            'http://midu.dev'
        ];

        if (ACCEPTED_ORIGINS.includes(origin)) {
            return callback(null, true);
        }

        if (!origin) {
            return callback(null, true);
        }
        return callback(new Error('Not allowed by CORS'));
    }
}
));
app.disable('x-powered-by');

// metodos normales: GET/HEAD/POST
// metodos complejos: PUT/PATCH/DELETE

// CORS PRE-Flight
// OPTIONS



app.get('/', (req, res) => {
    res.json({message: 'Hola mundo'})
});

app.get('/movies', (req, res) => {
    // const origin = req.header('origin');
    // // cuando la peticion es del msimo ORIGIN
    // if( ACCEPTED_ORIGINS.includes(origin) || !origin) {
    //     res.header('Access-Control-Allow-Origin', origin); // * todos los origenes que esten permitidos
    // }
   
    const { genre } = req.query // trae valor en JSON
    if(genre) {
        const filtereMovies = movies.filter(
            movie => movie.genre.some(g => g.toLocaleLowerCase() === genre.toLowerCase())
        )
        return res.json(filtereMovies);
    }
 res.json(movies)
})

app.delete('/movies/:id', (req, res) => {
    // const origin = req.header('origin');
    // // cuando la peticion es del msimo ORIGIN
    // if( ACCEPTED_ORIGINS.includes(origin) || !origin) {
    //     res.header('Access-Control-Allow-Origin', origin); // * todos los origenes que esten permitidos
    // }

    const { id } = req.params;
    const movieIndex = movies.findIndex(movie => movie.id === id);
    if ( movieIndex === -1 ) return res.status(404).json({ message: 'Movie not found' });
    movies.splice(movieIndex, 1);
    res.json(movies)

})

app.get('/movies/:id', (req, res) => {
    const { id } = req.params;
    const movie = movies.find(movie => movie.id === id);
    if ( movie ) return res.json(movie);

    res.status(404).json({ message: 'Movie not found'});
})

app.post('/movies', (req, res) => {
    const result = validateMovie(req.body);

    if(result.error) {
        return res.status(400).json({ error: result.error.message });
    }

    newMovie = {
        id: crypto.randomUUID(),
        ...result.data
    }

    movies.push(newMovie);

    res.status(201).json(newMovie) // actualizar la cache del cliente
})

app.patch('/movies/:id', (req, res) => {
    const { id } = req.params;
    
    if (!result.success) {
        return res.status(400).json({ error: result.error.message });
    }
    
    const movieIndex = movies.findIndex(movie => movie.id === id);
    
    const result = validateMovie(req.body);
    if ( movieIndex === -1 ) return res.status(404).json({ message: 'Movie not found' });

    const updateMovie = {
        ...movies[movieIndex],
        ...result.data
    }
    
     movies[movieIndex] = updateMovie;

     return res.json(updateMovie);
})

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