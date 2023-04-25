const {Dog, Temperament} = require('../db')
const axios = require('axios')
const {KEY_DOGS} = process.env 

const getDogsApi = async () => {
    try {
        const {data}= await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${KEY_DOGS}`)
        
        const dogs = await (await data.map(({weight, height, id,name,life_span,image,temperament}) =>{
            const [min_weight, max_weight]= weight.metric.split('-').map(parseFloat);
            const [min_height, max_height]= height.metric.split('-').map(parseFloat);
            const dogId = id.toString();
            return{
                id:dogId,
                name:name, 
                min_weight: min_weight || 0,
                max_weight: max_weight || 1,
                min_height: min_height || 0,
                max_height: max_height || 1,
                life_span,
                image: image.url,
                temperament: temperament 
            };
        })
        )
        console.log(dogs);
        return dogs; 
        
    } catch (err) {
        console.log(err);
    }
}


const dbDogs= async () =>{
    try {
        const dogsDb = await Dog.findAll({
           
            include:{
                attributes: ["name"],
                model: Temperament,
                through:{
                    attributes: [],
                }
            }
        })
        return dogsDb
    } catch (error) {
        console.log(error);
    }
}

const allDogs = async () =>{
    const apiDogs = await getDogsApi()
    const dogsDb = await dbDogs()
    const all = apiDogs.concat(dogsDb)
    return all 

}


module.exports = {allDogs}