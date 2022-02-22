const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

const movieRoutes = require("./movies.routes")
router.use("/movies", movieRoutes)

const celebritiesRoutes = require("./celebrities.routes")
router.use("/celebrities", celebritiesRoutes)





module.exports = router;
