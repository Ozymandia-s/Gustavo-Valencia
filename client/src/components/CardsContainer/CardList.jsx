import Card from "../Card/Card";
import { Link } from "react-router-dom";
import styles from "./CardList.module.css";

export default function CardList({ currentDogs }) {
  return (
    <div className={styles.cardList}>
      {currentDogs.map((d) => {
        return (
          <Link to={`/dogs/${d.id}`}>
            <Card
              key={d.id}
              name={d.name}
              image={d.image}
              min_weight={d.min_weight}
              max_weight={d.max_weight}
              min_height={d.min_height}
              max_height={d.max_height}
              life_span={d.life_span}
              temperament={
                <div>
                  <p>
                    {typeof d.temperament === "string"
                      ? d.temperament
                      : d.temperaments
                      ? d.temperaments.map((t) => t.name).join(",")
                      : ""}
                  </p>
                </div>
              }
            />
          </Link>
        );
      })}
    </div>
  );
}
