const z = require('zod');

const movieShema = z.object({
        title: z.string({
            invalid_type_error: 'Movie title must be a string',
            required_error: 'Movie title is required'
        }),
        genre: z.array(
            z.enum([
                'Action',
                'Adventure',
                'Comedy',
                'Drama']), {
                    required_error: 'Genre is required',
                    invalid_type_error: 'Genre must be an array'
                }),
        year: z.number().int().min(1900).max(2024),
        director: z.string(),
        duration: z.number().int().positive(),
        rate: z.number().min(0).max(10).default(5),
        poster: z.string().url({
            message: 'Poster must be a valid URL'
        })
    })

    function validateMovie(input) {
        return movieShema.safeParse(input);
    }

    function validatePartialMovie(input) {
        return movieShema.partial().safeParse(input);
    }

    module.exports = {
        validateMovie,
        validatePartialMovie
    }