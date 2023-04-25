import {Link} from "react-router-dom"
import style from "./NavBar.module.css"

export function NavBar (){
    return(
        <div className={style.MainContainer}>
            <Link to ="/home">HOME</Link>
            <Link to = "/create">CREATE NEW DOG</Link>
        </div>
    )
}