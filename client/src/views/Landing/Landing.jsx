import { Link } from "react-router-dom";
import styles from "./Landing.module.css"


function Landing(){
    return(
        <div className={styles.landing}>
            <h1 >Bienvenidos a Perritos</h1>
            <Link to ="/home">
                <button>Ir a la Home</button>
            </Link>
        </div>

    )
}

export default Landing