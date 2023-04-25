import React from "react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { getDoggyName } from "../../redux/actions/actions"
import styles from "./SearchBar.module.css"


export default function SearchBar(){
    
    const dispatch = useDispatch()
    const[name,setName] = useState('')
    
    
    function handleInputChange(doggy){
        //doggy.preventDefault()
        setName(doggy.target.value)
        console.log(name);
    }
    function handleSubmit(doggy){
        doggy.preventDefault()
        
        dispatch(getDoggyName(name))
        
    }
    return(
        <div className={styles.search}>
            <input
                type= "text"
                
                placeholder="Ingresa nombre del Perro aquí"
                onChange={doggy => handleInputChange(doggy)}
                />

            <button type="submit"onClick={doggy => handleSubmit(doggy)}
                >
                    <strong>Buscar</strong>

            </button>
            
        </div>
    )
}