import axios from "axios"
export const GET_DOGS = "GET_DOGS"
export const GET_DOGGYNAME = "GET_DOGGYNAME"
export const GET_TEMPERAMENT = "GET_TEMPERAMENT"
export const GET_DETAILS = "GET_DETAILS"
export const POST_DOG = "POST_DOG"
export const TEMPERAMENT_FILTER = "TEMPERAMENT_FILTER"
export const ORDER_BY_NAME = "ORDER_BY_NAME"
export const FILTER_BY_CREATED = "FILTER_BY_CREATED"
export const SORT_BY_DOG_WEIGHT = "SORT_BY_DOG_WEIGHT"
export const CLEAR_TEMPERAMENT = "CLEAR_TEMPERAMENT"
export const SELECTED_TEMPERAMENTS = "SELECTED_TEMPERAMENTS"

export function getAll() {
    return async function (dispatch) { // conexion del front con el back
        const dogsList = await (await axios.get(`http://localhost:3001/Dogs`));
        return dispatch({
            type: GET_DOGS,
            payload: dogsList.data
        })
    }
}

export function getDoggyName(payload) {
    return async function (dispatch) {
        const doggyName = await axios.get(`http://localhost:3001/Dogs?name=${payload}`)
        return dispatch({
            type: GET_DOGGYNAME,
            payload: doggyName.data
        })
    }
}

export function getTemperaments() {
    return async function (dispatch) {
        const temperaments = await (await axios.get(`http://localhost:3001/temperaments/`)) //{}
        return dispatch({
            type: GET_TEMPERAMENT,
            payload: temperaments.data
        })
    }
}

export function getDogsById(id) {
    return async function (dispatch) {
        const dogsById = await (await axios(`http://localhost:3001/Dogs/${id}`))
        return dispatch({
            type: GET_DETAILS,
            payload: dogsById.data
        })
    }
}

export function createNewDog(payload) {
    return async function (dispatch) {
        const create = await axios.post(`http://localhost:3001/Dogs/create`, payload)
        return create
    }
}

export function temperamentFilter(payload) {
    return {
        type: TEMPERAMENT_FILTER,
        payload
    }
}

export function orderByName(payload) {
    return {
        type: ORDER_BY_NAME,
        payload
    }
}

export function filterByCreated(payload) {
    return {
        type: FILTER_BY_CREATED,
        payload
    }
}
export function sortByDogWeight(payload) {
    return {
        type: SORT_BY_DOG_WEIGHT,
        payload
    }
}
export function clearTemperament(payload) {
    return {
        type: CLEAR_TEMPERAMENT,
        payload
    }
}
export function selectedTemperaments(payload) {
    return {
        type: SELECTED_TEMPERAMENTS,
        payload
    }
}