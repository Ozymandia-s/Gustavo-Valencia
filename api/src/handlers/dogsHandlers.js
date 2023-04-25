const { Router } = require('express');


const { allDogs, dogCreate } = require('../controllers/dogsController')

const { Dog, Temperament } = require('../db')

const getBreedName = async (req, res) => {
    try {

        let { name } = req.query;
        const eachDog = await allDogs()
        if (name) {
            name = name.toLowerCase();
            let breed_name = [];
            for (let i = 0; i < eachDog.length; i++) {
                if (eachDog[i].name.toLowerCase().includes(name)) { 
                    breed_name.push(eachDog[i]);
                }
            }
            console.log(eachDog);
            if (breed_name.length > 0) {
                res.status(200).send(breed_name);
            } else {
                res.status(404).send('No breed found');
            }
        } else {
            res.status(200).send(eachDog);
        }

    } catch (error) {
        error;
    }
}

const getById = async (req, res) => {

    try {
        let { id } = req.params;
        const eachDog = await allDogs();
        let dogById = null;
        for (const dog of eachDog) {
            if (dog.id === id) {
                dogById = dog;
                break;
            }
        }
        if (dogById) {
            res.status(200).send(dogById);
        } else {
            res.status(404).send('No dog found');
        }

    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error')
    }

}

const postDog = async (req, res) => {
    const {
        name,
        min_height,
        min_weight,
        max_height,
        max_weight,
        life_span,
        image,
        createInDb,
        temperaments 
    } = req.body;
    
    let new_Breed= await Dog.create({
        name,
        min_height,
        min_weight,
        max_height,
        max_weight,
        life_span,
        image,
        createInDb
    })

    const temp = await Temperament.findAll({
        where:{
            name: temperaments
        }
    })
    new_Breed.addTemperament(temp) 

    res.status(201).send("Create")
   
   
}


module.exports = {
    getBreedName,
    getById,
    postDog
}
