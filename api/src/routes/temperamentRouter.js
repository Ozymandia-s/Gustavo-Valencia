const {Router} = require('express')
dogUserRouter = Router()
const {getTemperament} = require ('../handlers/temperamentHandler')

dogUserRouter1 = Router()

dogUserRouter1.get("/",getTemperament)

module.exports= dogUserRouter1