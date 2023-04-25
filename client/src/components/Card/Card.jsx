import styles from "./Card.module.css"

export default function Card ({image,name,temperament,min_weight,max_weight}){
    return(
        <div className={styles.card}>
            <h1>{name}</h1>
            <img src={image} alt ={`${name}`} />
            <h3>Temperaments:{temperament}</h3>
            <h3>Minimun Weight: {min_weight} </h3>
            <h3>Maximun Weight: {max_weight} </h3>
        </div>
    )
}