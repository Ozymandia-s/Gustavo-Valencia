import React, { useState } from "react";
import styles from "./Paginated.module.css"

export default function Paginated({ dogsPerPage, allDogs, handlePageChange }) {
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
    pageNumber.push(i);
  }

  const blockForPage = 5 

  const [firstPage, setFirstPage] = useState(0);
  const [lastPage, setLastPage] = useState(blockForPage -1);

  const handleClickBack = () => {
    const newFirstPage = Math.max(0, firstPage - blockForPage);
    const newLastPage = Math.max(newFirstPage + blockForPage -1, lastPage - blockForPage);

    setFirstPage(newFirstPage);
    setLastPage(newLastPage);
  };

  const handleClickNext = () => {
    const newLastPage = Math.min(lastPage + blockForPage, pageNumber.length);
    const newFirstPage = Math.min(newLastPage - blockForPage, firstPage + blockForPage);

    setFirstPage(newFirstPage);
    setLastPage(newLastPage);
  };

  return (
    <nav className={styles.pagination}>
      <ul>
        {firstPage > 0 && (
          <li key="back">
            <button onClick={handleClickBack}>Back</button>
          </li>
        )}

        {pageNumber.slice(firstPage, lastPage +1).map((number) => (
          <li key={number}>
            <button onClick={() => handlePageChange(number)}>{number}</button>
          </li>
        ))}

        {lastPage < pageNumber.length - 1 && (
          <li key="next">
            <button onClick={handleClickNext}>Next</button>
          </li>
        )}
      </ul>
    </nav>
  );
}




