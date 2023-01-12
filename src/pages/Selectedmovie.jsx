import axios from "axios";
import "./styles/selectedMovie.css";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function SelectedMovie() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState([]);

  async function getMovie() {
    const { data } = await axios.get(
      `https://www.omdbapi.com/?&apikey=c968a92&i=${id}`
    );
    setMovie(data);
    console.log(data);
  }
  useEffect(() => {
    getMovie();
  }, [id]);
  return (
    <div className="container">
      <div className="arrow-back" onClick={() => navigate("/browse")}>
        <ArrowBackIcon /> Movies
      </div>
      <div className="selectedMovie">
        <figure>
          <img src={movie.Poster} alt="" />
        </figure>
        <div className="selectedMovie__info">
          <h2 className="selectedMovie__title">{movie.Title}</h2>
          <div className="selectedMovie__facts">
            <div className="selectedMovie__rated">{movie.Rated}</div>
            {" . "}{' '}
            <div className="selectedMovie__released">{movie.Released}</div>
            {" . "}{' '}
            <div className="selectedMovie__genre">{movie.Genre}</div>
            {" . "}{' '}
            <div className="selectedMovie__runtime">{movie.Runtime}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectedMovie;
