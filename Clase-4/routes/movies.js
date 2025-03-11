import { Router } from "express"; // Crear un enrutador el cual nos permitira responder todos los paths
import { randomUUID } from 'crypto';

import { validateMovie, validatePartialMovie } from "../schemas/moves";

export const moviesRouter = Router();

moviesRouter.get('/', (req, res) => {
    const { genre } = req.query // trae valor en JSON
    if (genre) {
        const filtereMovies = movies.filter(
            movie => movie.genre.some(g => g.toLocaleLowerCase() === genre.toLowerCase())
        )
        return res.json(filtereMovies);
    }
    res.json(movies)
})

moviesRouter.get('/:id', (req, res) => {
    const { id } = req.params;
    const movie = movies.find(movie => movie.id === id);
    if ( movie ) return res.json(movie);

    res.status(404).json({ message: 'Movie not found'});
})

moviesRouter.post('/', (req, res) => {
    const result = validateMovie(req.body);

    if(result.error) {
        return res.status(400).json({ error: result.error.message });
    }

    newMovie = {
        id: randomUUID(),
        ...result.data
    }

    movies.push(newMovie);

    res.status(201).json(newMovie) 
})

moviesRouter.delete('/:id', (req, res) => {
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

moviesRouter.patch('/:id', (req, res) => {
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

