const router = require("express").Router();

const Movie = require('../models/Movie.model')
const Celebrity = require('../models/Celebrity.model')


router.get('/create', async (req, res) => {
    const allCelebrities = await Celebrity.find()
    res.render("movies/new-movie", { allCelebrities })
})

router.post('/create', async (req, res, next) => {
    //res.send(req.body)
    const movie = {
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast
    }
    try {
        const createdMovie = await Movie.create(movie)
        res.redirect('/movies')

    } catch (error) {
        res.render("movies/new-movie")
    }
})

router.get('/', async (req, res) => {
    try {
        const allMovies = await Movie.find().populate("cast")
        res.render("movies/movies", { movies: allMovies })

    } catch (error) {
        console.log(error)
    }
})

router.get("/:id", async (req, res) => {
    try {
        const oneMovie = await Movie.findById(req.params.id).populate("cast")
        //const cast = await Celebrity.find({ cast: req.params.id })
        res.render('movies/movie-details', { oneMovie })
    } catch (error) {
        console.log(error)
    }
})

router.post("/:id/delete", async (req, res) => {
    try {
        await Movie.findByIdAndDelete(req.params.id)
        res.redirect("/movies")
    } catch (error) {
        console.log(error)

    }
})

router.get("/:id/edit", async (req, res) => {
    try {
        const oneMovie = await Movie.findById(req.params.id)
        const allCelebrities = await Celebrity.find().populate("cast")
        //mongoose stores the actual document inside document._doc, and only allows us to access it through a getter function. this is a hacky way to retrieve the actual document and edit it
        //const mappedCelebrities = allCelebrities.map(celeb => celeb._doc);
        //
        //mappedCelebrities.forEach(celeb => {
        //    oneMovie.cast.forEach(star => {
        //        if (celeb._id.equals(star._id)) {
        //            celeb.isSelected = true;
        //        }
        //    });
        //});
        res.render("movies/edit-movie", { allCelebrities, oneMovie })
    } catch (error) {
        console.log(error)

    }
})

router.post("/:id", async (req, res) => {
    try {
        const movie = {
            title: req.body.title,
            genre: req.body.genre,
            plot: req.body.plot,
            cast: req.body.cast
        }
        await Movie.findByIdAndUpdate(req.params.id, movie);
        res.redirect("/movies");
    } catch (error) {
        console.log(error);
    }
});




module.exports = router;


