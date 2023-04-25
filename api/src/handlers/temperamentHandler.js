const {allDogs} = require ('../controllers/dogsController')
const {Router} = require ('express')
const {Temperament} = require('../db')

const getTemperament= async(req,res) =>{
    try{
        const allDog= await allDogs()
        const temperament = [
            ...new Set(allDog.map((t) => t.temperament).join().split(',').sort())
        ]
        for(i = 1; i < temperament.length; i++){
            const temperament1 = temperament[i].replace(" ","")
            Temperament.findOrCreate({
                where:{
                    name:temperament1
                }
            })
        }
        const allTemperament = await Temperament.findAll()
        res.send(allTemperament)
    }catch(error){
        console.log(error);
    }
}


module.exports = {
    getTemperament,
}