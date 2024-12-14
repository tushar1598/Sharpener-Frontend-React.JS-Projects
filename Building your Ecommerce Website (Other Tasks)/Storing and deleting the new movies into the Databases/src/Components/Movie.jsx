import React from "react";
import styles from "./Movie.module.css";

const Movie = (props) => {
  const deleteHandler = async (id) => {
    const response = await fetch(
      `https://ecommerce-website-9b2c1-default-rtdb.firebaseio.com/movies/${id}.json`,
      {
        method: "DELETE",
      }
    );
    alert(`Movie "${props.title}" has been successfully deleted.`);
    window.location.reload();
  };

  return (
    <li className={styles.movie}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      <button onClick={() => deleteHandler(props.id)}>Delete</button>
    </li>
  );
};

export default Movie;
