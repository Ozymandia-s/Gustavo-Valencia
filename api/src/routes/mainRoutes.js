const { Router } = require('express');
const dogUserRouter = require ('../routes/dogUserRouter')
const dogUserRouter1 = require('../routes/temperamentRouter')




const mainRoutes = Router();


mainRoutes.use("/Dogs",dogUserRouter)
mainRoutes.use("/temperaments",dogUserRouter1)




module.exports = mainRoutes;
