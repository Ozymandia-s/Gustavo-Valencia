import React from "react";
import { useEffect } from "react";
import { getDogsById } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import styles from "./Detail.module.css";

export default function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getDogsById(id));
  }, [dispatch, id]);

  const detailDog = useSelector((state) => state.dogsById);

  console.log(detailDog);

  return (
    <div className={styles.detail}>
      {detailDog.length === 0 ? (
        <p>Cargando...</p>
      ) : (
        <div>
          <div>
            <h1>{detailDog.name}</h1>
          </div>
          <img src={detailDog.image} alt="img not found" />
          <div>
            <h4>
              Temperaments:
              <p>
                {" "}
                {typeof detailDog.temperament === "string"
                  ? detailDog.temperament
                  : detailDog.temperaments
                  ? detailDog.temperaments.map((t) => t.name).join(",")
                  : ""}{" "}
              </p>{" "}
            </h4>
            <h3>Height:</h3>
            <p>
              {detailDog.min_height}cm - {detailDog.max_height}cm
            </p>
            <h3>Life Span:</h3>
            <p>{detailDog.life_span}</p>
          </div>
        </div>
      )}
    </div>
  );
}
