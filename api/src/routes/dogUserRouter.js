const {Router} = require('express')

const {getBreedName,getById,postDog} = require ('../handlers/dogsHandlers')
const {getTemperament} = require ('../handlers/temperamentHandler')
dogUserRouter = Router()

dogUserRouter.get("/",getBreedName)
dogUserRouter.get("/:id",getById)
dogUserRouter.get("/",getTemperament)
dogUserRouter.post("/create",postDog)
module.exports = dogUserRouter