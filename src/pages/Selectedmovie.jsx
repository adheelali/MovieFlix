import axios from "axios";
import "./styles/selectedMovie.css";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import GradeIcon from "@mui/icons-material/Grade";
import { useRecoilState } from "recoil";
import { movieTextState } from "../../atoms/Atom";
import Movies from "../components/Movies";

function SelectedMovie() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [buttonClick, setButtonClick] = useState(true);
  const [movie, setMovie] = useState([]);
  const [searchText, setSearchText] = useRecoilState(movieTextState);
  const [moviesData, setMoviesData] = useState([]);

  async function getMovieById() {
    const { data } = await axios.get(
      `https://www.omdbapi.com/?&apikey=c968a92&i=${id}`
    );
    setMovie(data);
  }

  async function getRecommendedMovies() {
    const { data } = await axios.get(
      `https://www.omdbapi.com/?&apikey=c968a92&s=${searchText}`
    );
    setMoviesData(data);
  }

  function addLocal() {
    let data = [];
    if (localStorage.getItem("favorites") === null) {
      data[0] = id;
      localStorage.setItem("favorites", JSON.stringify(data));
    }
    if (data.length > 0) {
      return;
    }
    let updatedData = JSON.parse(localStorage.getItem("favorites"));
    updatedData.push(id);
    localStorage.setItem("favorites", JSON.stringify(updatedData));
  }

  function removeLocal() {
    let data = JSON.parse(localStorage.getItem("favorites"));
    const filteredData = data.filter((currId) => currId !== id);
    localStorage.setItem("favorites", JSON.stringify(filteredData));
  }

  function buttonSwitch() {
    const data = JSON.parse(localStorage.getItem("favorites"));

    if (data?.length === 0 || data === null) {
      setButtonClick(true);
      return;
    }

    if (data?.includes(id)) {
      setButtonClick(false);
    } else setButtonClick(true);
  }

  useEffect(() => {
    buttonSwitch();
    getMovieById();
    getRecommendedMovies();
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
            <div className="movie__facts">
              <div>{movie.Released}</div>
              {" . "} <div>{movie.Genre}</div>
              {" . "} <div>{movie.Type}</div>
              {" . "} <div>{movie.Runtime}</div>
            </div>
          </div>
          <div className="selectedMovie__ratings">
            <div className="selectedMovie__score">
              <div className="selectedMovie__metascore">{movie.Metascore}</div>
              <span>Metascore</span>
            </div>
            <div className="selectedMovie__imdbRating">
              <div>{movie.imdbRating}/10</div>
              <span>IMDB</span>
            </div>
          </div>
          <div className="selectedMovie__overview">
            <h3>Overview</h3>
            <p>{movie.Plot}</p>
          </div>
          <div className="selectedMovie__cast">
            <h3>Cast</h3>
            <p>{movie.Actors}</p>
          </div>
          <div className="selectedMovie__director">
            <h3>Director</h3>
            <p>{movie.Director}</p>
          </div>
          <div className="selectedMovie__writer">
            <h3>Writer</h3>
            <p>{movie.Writer}</p>
          </div>
          <div className="selectedMovie__boxoffice">
            <h3>Box Office</h3>
            <p>{movie.BoxOffice || "N/A"}</p>
          </div>
          {buttonClick ? (
            <button
              className="favorite__button"
              onClick={() => {
                addLocal();
                buttonSwitch();
              }}
            >
              <GradeIcon /> Add to favorites
            </button>
          ) : (
            <button
              className="favorite__button remove__button"
              onClick={() => {
                removeLocal();
                buttonSwitch();
              }}
            >
              <GradeIcon /> Remove from favorites
            </button>
          )}
        </div>
      </div>
      <div className="Recommended__movie">
        <h2>Recommended Movies</h2>
        <div className="recommended__movie--wrapper">
          {moviesData?.Search?.filter((data) => data.imdbID !== id)
            .slice(0, 4)
            .map((data) => (
              <Movies key={data.imdbID} data={data} recommended />
            ))}
        </div>
      </div>
    </div>
  );
}

export default SelectedMovie;
