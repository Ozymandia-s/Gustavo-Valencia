import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Paginated from "../../components/Paginated/Paginated";
import SearchBar from "../../components/SearchBar/SearchBar";
import CardList from "../../components/CardsContainer/CardList";
import ModoClaroOscuro from "../../components/ModSunMoon/ModSunMoon";
import styles from "./Home.module.css";
import {
  selectedTemperaments,
  clearTemperament,
  getAll,
  getTemperaments,
  temperamentFilter,
  orderByName,
  filterByCreated,
  sortByDogWeight,
} from "../../redux/actions/actions";

function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.filterByDogs);
  console.log(allDogs);
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage] = useState(8);
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);
  console.log(currentDogs);
  const [, setOrder] = useState("");

  const selectedTemperament = useSelector(
    (state) => state.selectedTemperaments
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getAll());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  const allTemperaments = useSelector((state) => state.temperaments);

  function handleClick(d) {
    d.preventDefault();
    dispatch(getAll());
    setCurrentPage(1);
  }

  function handleSelect(d) {
    d.preventDefault();
    setCurrentPage(1);
    if (d.target.value === "all") {
      dispatch(clearTemperament());
      dispatch(selectedTemperaments("all"));
    } else {
      dispatch(temperamentFilter(d.target.value));
      dispatch(selectedTemperaments(d.target.value));
    }
  }

  const [, setBreeds] = useState("all");

  function handleFilterCreated(d) {
    d.preventDefault();
    dispatch(filterByCreated(d.target.value));
    setBreeds(d.target.value);
    setCurrentPage(1);
  }

  function handleSort(d) {
    d.preventDefault();
    dispatch(orderByName(d.target.value));
    setCurrentPage(1);
    setOrder(`arreglado ${d.target.value}`);
  }

  const [, setOrderWeight] = useState("");

  function handleWeight(d) {
    d.preventDefault();
    dispatch(sortByDogWeight(d.target.value));
    setCurrentPage(1);
    setOrderWeight(d.target.value);
  }

  return (
    <div>
      <li>
        <button onClick={(d) => handleClick(d)}>ALL DOGS</button>
      </li>
      <div>
        <li>
          <select className={styles.select} onChange={(d) => handleSort(d)}>
            <option value="selected">Busqueda por: </option>
            <option value="asc">A - Z</option>
            <option value="desc">Z - A</option>
          </select>
        </li>
        <li>
          <select onChange={(d) => handleWeight(d)}>
            <option value="selected">Sort by Weight</option>
            <option value="asc">min - max</option>
            <option value="desc">max - min</option>
          </select>
        </li>
        <li>
          <select onChange={(d) => handleSelect(d)}>
            <option key={0} value="all">
              Add & Clear temperaments
            </option>
            {allTemperaments
              ?.sort(function (a, b) {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
              })
              .map((d) => {
                return (
                  <option key={d.id} value={d.name}>
                    {d.name}
                  </option>
                );
              })}
          </select>
        </li>

        <li>
          <select class="select" onChange={(d) => handleFilterCreated(d)}>
            <option value="all">All breeds</option>
            <option value="api">Existent breeds</option>
            <option value="created">Created breeds</option>
          </select>
        </li>
        <div />
        {selectedTemperament.length > 0 && (
          <div>
            {selectedTemperament.map((temperament) => (
              <span key={temperament}>{temperament} </span>
            ))}
          </div>
        )}
      </div>
      <div>
        <SearchBar />
      </div>
      <ModoClaroOscuro />
      <CardList currentDogs={currentDogs} />
      <div>
        <Paginated
          dogsPerPage={dogsPerPage}
          allDogs={allDogs.length}
          handlePageChange={handlePageChange}
        />
        <h1>HENRY DOGS</h1>
      </div>
    </div>
  );
}

export default Home;
