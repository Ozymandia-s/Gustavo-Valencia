import React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { createNewDog, getTemperaments } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import styles from "./DogCreate.module.css"

function validate(input) {
  let err = {};
  if (!input.name) {
    err.name = "Put a breed for your Dog";
  } else if (!input.min_height) {
    err.min_height = "Minimun height is required";
  } else if (isNaN(parseFloat(input.min_height))) {
    err.min_height = "Minimun height must be a number";
  } else if (input.min_height <= 0) {
    err.min_height = "Minimun height must be greater than 0";
  } else if (parseFloat(input.min_height) >= parseFloat(input.max_height)) {
    err.min_height = "Minimun height must be less to the maximun height";
  } else if (!input.max_height) {
    err.max_height = "Maximun height is required";
  } else if (isNaN(parseFloat(input.max_height))) {
    err.max_height = "Maximun height must be a number";
  } else if (input.max_height >= 160) {
    err.max_height = "Maximun height must be less than 160";
  } else if (!input.min_weight) {
    err.min_weight = "Minimun weight is required";
  } else if (isNaN(parseFloat(input.min_weight))) {
    err.min_weight = "Minimun weight must be a number";
  } else if (input.min_weight <= 0) {
    err.min_weight = "Minimun weight must be greater than 0";
  } else if (!input.max_weight) {
    err.max_weight = "Maximun weight is required";
  } else if (parseFloat(input.max_weight) <= parseFloat(input.min_weight)) {
    err.max_weight = "Maximun weight must be greater than minimun weight";
  } else if (input.max_weight > 200) {
    err.max_weight = "Maximun weight must be less than 200";
  } else if (!input.life_span) {
    err.life_span = "Life span is required";
  } else if (isNaN(parseFloat(input.life_span))) {
    err.life_span = "Life span must be a number";
  } else if (input.life_span > 30) {
    err.life_span = "Life span must be less than 30";
  } else if (input.life_span <= 0) {
    err.life_span = "Life span must be greater than 0";
  }
  return err;
}

export default function DogCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const allTemperaments = useSelector((state) => state.temperaments);
  console.log(allTemperaments);
  const [err, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    min_weight: "",
    max_weight: "",
    min_height: "",
    max_height: "",
    life_span: "",
    image: "",
    temperaments: [],
  });
  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  function changeHandle(event) {
    const property = event.target.name
    const value = event.target.value
    
    setInput({
      ...input,
      [property]:value
    });
    
    setErrors(
      validate({
        ...input,
        [property]: value
      })
    );
  }
  useEffect(()=>{
    console.log(input);
  },[input])
  function handleSelect(d) {
    if (!input.temperaments.includes(d.target.value)) {
      setInput({
        ...input,
        temperaments: [...input.temperaments, d.target.value],
      });
      console.log(input);
    }
  }
  function submitHandle(d) {
    d.preventDefault()
    console.log(err);
    if(!Object.getOwnPropertyNames(err).length && input.name && input.min_height && input.max_height && input.min_weight && input.max_weight && input.life_span && input.temperaments.length){
        dispatch(createNewDog(input));
        alert('Doggy was created')
        setInput({
            name:'',
            min_weight:'',
            max_weight:'',
            min_height:'',
            max_height:'',
            life_span:'',
            image:'',
            temperaments: [],
        })
        history.push('/home')
    }else{
        alert('Dog can´t be create')
    }
  }function handleDeleteTemperament(d){
    setInput({
        ...input,
        temperaments: input.temperaments.filter(t=> t !== d)
    })
  }
  return (
  <div className="form-container">
    
  
    <h1>Create a new Dog</h1>
    <form className={styles.form} onSubmit={d => submitHandle(d)}>
        <div>
            <label><strong>Name:</strong></label>
            <input type="text" value={input.name} name='name' onChange={d => changeHandle(d)}/>
            {err.name && (<p><strong>{err.name}</strong></p>)}
        </div>
        <div>
            <label><strong>Minimun weight:</strong></label>
            <input type="text" value={input.min_weight} name='min_weight' onChange={d => changeHandle(d)}/>
            {err.min_weight && (<p><strong>{err.min_weight}</strong></p>)}
        </div>
        <div>
            <label><strong>Maximun weight:</strong></label>
            <input type="text" value={input.max_weight} name='max_weight' onChange={d => changeHandle(d)}/>
            {err.max_weight && (<p><strong>{err.max_weight}</strong></p>)}
        </div>
        <div>
            <label><strong>Minimun height:</strong></label>
            <input type="text" value={input.min_height} name='min_height' onChange={d => changeHandle(d)}/>
            {err.min_height && (<p><strong>{err.min_height}</strong></p>)}
        </div>
        <div>
            <label><strong>Maximun height:</strong></label>
            <input type="text" value={input.max_height} name='max_height' onChange={d => changeHandle(d)}/>
            {err.max_height && (<p><strong>{err.max_height}</strong></p>)}
        </div>
        <div>
            <label><strong>Life Span (years):</strong></label>
            <input type="text" value={input.life_span} name='life_span' onChange={d => changeHandle(d)}/>
            {err.life_span && (<p><strong>{err.life_span}</strong></p>)}
        </div>
        <div>
            <label><strong>Image:</strong></label>
            <input type="text" value={input.image} name="image" onChange={d =>changeHandle(d)} />
        </div>
        <div>
            <select onChange={d => handleSelect(d)}>
                <option value="selected" hidden>Select a temperaments</option>
                {allTemperaments?.sort(function(first,second){
                    if(first.name < second.name)return -1;
                    if(first.name > second.name)return 1;
                    return 0;
                    }).map(temperament => {return (<option key={temperament.name} value={temperament.name}>{temperament.name}</option>)}
                )}
            </select>
            {input.temperaments.map(d =>{
                return(
                    <ul key={d}>
                        <li>
                            <p><strong>{d}</strong></p>
                            <button onClick={()=> handleDeleteTemperament(d)}>X</button>
                        </li>
                    </ul>
                )
            })}
        </div>
            <button type="submit"><strong>CREATE</strong></button>
    </form>
  </div>
  );
}
