const router = require("express").Router();


const Movie = require('../models/Movie.model')
const Celebrity = require('../models/Celebrity.model')


router.get('/create', async (req, res) => {
    const allCelebrities = await Celebrity.find()
    res.render("movies/new-movie", { allCelebrities })
})

router.post('/create', async (req, res, next) => {
    res.send(req.body)
    const movie = {
        name: req.body.name,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast
    }
    try {
        const createdMovie = await (await Movie.create(movie))
        res.redirect('/movies')

    } catch (error) {
        res.render("movies/new-movie")
    }
})


module.exports = router;


