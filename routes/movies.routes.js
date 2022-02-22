const CelebrityModel = require("../models/Celebrity.model");
const MovieModel = require("../models/Movie.model");

const router = require("express").Router()


//GET "/movies/create" ruta para crear y traer celebrities

router.get('/create', (req, res, next) => {
  CelebrityModel.find()
  .then((allCelebrities) => {
      res.render("movies/new-movie.hbs", {allCelebrities})
  })
  .catch((err) => {
      next(err);
  })
})

//POST "/movies/create" ruta para añadir la celebrity a la base de datos
router.post('/create', (req, res, next) =>{
  MovieModel.create({
    
      title: req.body.title,
      genre: req.body.genre,
      plot: req.body.plot,
      cast: req.body.cast,
  })
  .then((createMovie) => {
      res.redirect("/movies")
  })
  .catch((err) =>{
    next(err);
  })
})

// GET
router.get('/', (req, res, next) => {
  MovieModel.find()
  .then((allMovies) => {
      res.render("movies/movies.hbs", {allMovies})
  })
  .catch((err) => {
      next(err);
  })
})

// Get "/Movies" 
router.get("/:id/details", (req, res, next) => {
  
  const id = req.params.id
  console.log(id);

  MovieModel.findById(id)
  .populate("cast") // ref a la propiedad del Schema
  .then((oneMovie) => {
    console.log(oneMovie);
    res.render("movies/movie-details.hbs", {oneMovie})
  })
  .catch((err) => {
    next(err)
  })

}),

router.get("/:id/edit", async (req, res, next) => {

  try{
    const {id} = req.params;

    // Movie to edit
    const oneMovie = await MovieModel.findById(id)

    // Cast list
    const allCast = await CelebrityModel.find()

    // render edit-form view
    res.render("movies/edit-movie.hbs", {oneMovie, allCast})
  }
  catch (err) {
    next(err)
  }
})



// POST "/movies/:id/edit" 

router.post("/:id/edit", (req, res, next) => {
  
  const {id} = req.params;

  const {title, genre, plot, cast} = req.body;

  
  MovieModel.findByIdAndUpdate(id, {
    title, 
    genre, 
    plot,
    
  })
  .then((updatedMovie) => {
    console.log(updatedMovie);
    
    //  res.redirect(`/movies/${updatedMovie._id}/details`)
    res.redirect("/")
  })
  .catch((err) => {
    next(err)
  })

}),


router.post("/:id/delete", async (req, res, next) => {
  
  try {
    const { id } = req.params
  
    const deletedMovie = await MovieModel.findByIdAndDelete(id)
    
    res.redirect("/movies")
  }

  catch(err) {
   next(err)
  }

})



module.exports = router