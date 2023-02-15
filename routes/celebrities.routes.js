const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model')
// all your routes here

router.get('/create', (req, res) => {
    res.render("celebrities/new-celebrity")
})

router.post('/create', async (req, res, next) => {

    try {
        const celebrity = {
            name: req.body.name,
            occupation: req.body.occupation,
            catchPhrase: req.body.catchPhrase
        }
        const createdCelebrity = await Celebrity.create(celebrity)
        res.redirect('/celebrities')

    } catch (error) {
        res.render("celebrities/new-celebrity")
    }
})

router.get('/', async (req, res) => {
    try {
        const allCelebrities = await Celebrity.find()
        res.render("celebrities/celebrities", { celebrities: allCelebrities })

    } catch (error) {
        console.log(error)
    }
})

module.exports = router;
