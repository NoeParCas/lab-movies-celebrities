const CelebrityModel = require("../models/Celebrity.model");
const router = require("express").Router()

router.get('/', (req, res, next) => {
    CelebrityModel.find()
    .then((allCelebrities) => {
        res.render("celebrities/celebrities.hbs", {allCelebrities})
    })
    .catch((err) => {
        next(err);
    })
})


//GET "/celebrities/create" ruta para crear celebrities

router.get('/create', (req, res, next) => {
    CelebrityModel.find()
    .then((newCelebrity) => {
        res.render("celebrities/new-celebrity.hbs", {newCelebrity})
    })
    .catch((err) => {
        next(err);
    })
})

//POST "/celebrities/create" ruta para añadir la celebrity a la base de datos
router.post('/create', (req, res, next) =>{
    CelebrityModel.create({
        name: req.body.name,
        ocupation: req.body.ocupation,
        catchPhrase: req.body.catchPhrase,
    })
    .then((createCeleb) => {
        res.redirect("/celebrities")
    })
    .catch((err) =>{
        res.redirect("/celebrities/new-celebrity")
    })
})


module.exports = router;