import { GET_DOGS, GET_DOGGYNAME, GET_TEMPERAMENT, GET_DETAILS, POST_DOG, TEMPERAMENT_FILTER, ORDER_BY_NAME, FILTER_BY_CREATED, SORT_BY_DOG_WEIGHT, CLEAR_TEMPERAMENT, SELECTED_TEMPERAMENTS } from "../actions/actions"

const initialState = {
    allDogs: [],
    temperaments: [],
    dogsById: [],
    filterByDogs: [],
    selectedTemperaments: [],
}
function orderDogsByName(allDogs, order) {
    return order === "asc"
        ? allDogs.sort((a, b) => a.name.localeCompare(b.name))
        : allDogs.sort((a, b) => b.name.localeCompare(a.name))
}

function filterDogsByCreated(allDogs, filterBy) {
    if (filterBy === "created") {
        return allDogs.filter(dog => dog.createdInDb)
    } else if (filterBy === "api") {
        return allDogs.filter(dog => !dog.createdInDb);
    } else {
        return allDogs;
    }
}
function sortDogsByWeight(allDogs, sortBy) {
    if (sortBy === "asc") {
        return allDogs.sort((a, b) => parseFloat(a.min_weight) - parseFloat(b.min_weight))
    } else {
        return allDogs.sort((a, b) => parseFloat(b.max_weight) - parseFloat(a.max_weight))
    }
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_DOGS:
            return {
                ...state,
                allDogs: action.payload,
                filterByDogs: action.payload
            }
        case GET_DOGGYNAME:
            return {
                ...state,
                filterByDogs: action.payload
            }
        case GET_TEMPERAMENT:
            return {
                ...state,
                temperaments: action.payload
            }
        case GET_DETAILS:
            return {
                ...state,
                dogsById: action.payload
            }
        case POST_DOG:
            return { ...state, }
        case FILTER_BY_CREATED:
            const filterBy = action.payload;
            const filteredDogs = filterDogsByCreated(state.allDogs, filterBy);
            return {
                ...state,
                filterByDogs: filteredDogs
            }
        case ORDER_BY_NAME:
            return {
                ...state, 
                filterByDogs: orderDogsByName(state.allDogs, action.payload)
            }
        case SORT_BY_DOG_WEIGHT: {
            const sortedDogs = sortDogsByWeight(state.allDogs, action.payload);
            return {
                ...state,
                filterByDogs: sortedDogs
            }
        }

        case TEMPERAMENT_FILTER: {
            const allDogs = state.filterByDogs;
            const temperamentFilter =
                action.payload === "all" ? allDogs :
                    allDogs.filter((doggy) => doggy.temperament?.includes(action.payload))
            return {
                ...state,
                filterByDogs: temperamentFilter
            }
        }
        //nuevo
        case SELECTED_TEMPERAMENTS: {
            const selectedTemperaments = action.payload === "all" ? [] : state.selectedTemperaments.concat(action.payload);
            return {
                ...state,
                selectedTemperaments
            };
        }


        case CLEAR_TEMPERAMENT: {
            return {
                ...state,
                selectedTemperaments: [],
                filterByDogs: state.allDogs
            }
        }
        default:
            return state;
    }

}

export default rootReducer;