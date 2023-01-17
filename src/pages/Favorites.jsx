import axios from "axios";
import React, { useEffect, useState } from "react";
import Movies from "../components/Movies";
import "./styles/favorites.css";

function Favories() {
  const [movie, setMovie] = useState([]);

  async function getMoviesById() {
    const movieIds = JSON.parse(localStorage.getItem("favorites"));
    const movieData = await Promise.all(
      movieIds?.map(async (id) => {
        const { data } = await axios.get(
          `https://www.omdbapi.com/?&apikey=c968a92&i=${id}`
        );
        return data;
      })
    );
    setMovie(movieData);
  }

  useEffect(() => {
    getMoviesById();
  }, []);

  return (
    <div className="favorites">
      <h2 className="favorites__title">Favorites</h2>
      <div className="favorites__main">
        {movie?.map((data) => (
          <Movies key={data.imdbID} data={data} recommended={true} />
        ))}
      </div>
    </div>
  );
}

export default Favories;