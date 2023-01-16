import axios from "axios";
import React, { useEffect, useState } from "react";
import Movies from "../components/Movies";
import "./styles/favorites.css";

function Favories() {
  const [movie, setMovie] = useState([]);

  function getMoviesById() {
    let movieArr = [];
    const movieIds = JSON.parse(localStorage.getItem("favorites"));

    movieIds?.forEach(async (elemId) => {
      const { data } = await axios.get(
        `https://www.omdbapi.com/?&apikey=c968a92&i=${elemId}`
      );
      movieArr.push(data);
    });
    setMovie(movieArr);
  }

  useEffect(() => {
    getMoviesById();
  }, []);

  return (
    <div className="favorites">
      <h2 className="favorites__title">Favorites</h2>
      <div className="favorites__main">
        {movie?.map((data) => (
           <Movies key={data.imdbID} data={data} recommended />
        ))}
      </div>
    </div>
  );
}

export default Favories;
