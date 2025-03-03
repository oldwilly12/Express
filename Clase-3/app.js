const express = require('express'); // require --> commonJS
const crypto = require('node:crypto');
const movies = require('./movies.json');
const { validateMovie } = require('./schemas/moves');

const app = express();

app.use(express.json);
app.disable('x-powered-by');

const ACCEPTED_ORIGINS = [
    'http://localhost:3000',
    'http://localhost:8000',
    'http://localhost:8080',
    'http://midu.dev'
];

app.get('/', (req, res) => {
    res.json({message: 'Hola mundo'})
});

app.get('/movies', (req, res) => {
    const origin = req.header('origin');
    // cuando la peticion es del msimo ORIGIN
    if( ACCEPTED_ORIGINS.includes(origin) || !origin) {
        res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // * todos los origenes que esten permitidos
    }
   
    const { genre } = req.query // trae valor en JSON
    if(genre) {
        const filtereMovies = movies.filter(
            movie => movie.genre.some(g => g.toLocaleLowerCase() === genre.toLowerCase())
        )
        return res.json(filtereMovies);
    }
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

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`);
})