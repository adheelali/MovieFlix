import React from "react";
import "./styles/movies.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";

function Movies({ data, recommended }) {
  const navigate = useNavigate();
  console.log(data)
  return (
    <>
      {recommended ? (
        <div
          style={{minWidth: '300px'}}
          className="movie__wrapper"
          onClick={() => navigate(`/browse/${data.imdbID}`)}
        >
          {data?.Poster ? (
            <figure className="movie__img--wrapper">
              <img src={data.Poster} alt="" />
            </figure>
          ) : (
            <div className="movie__img--skeleton"></div>
          )}
          <div className="movie__description">
            <div className="movie__title">{data.Title}</div>
            <div className="movie__info">
              <div className="movie__year">{data.Year}</div>
              <div className="movie__type">{data.Type}</div>
            </div>
          </div>
          <VisibilityIcon />
        </div>
      ) : (
        <div className="movie__list">
          {data?.Search?.map((data) => (
            <div
              className="movie__wrapper"
              key={data.imdbID}
              onClick={() => navigate(`/browse/${data.imdbID}`)}
            >
              {data?.Poster ? (
                <figure className="movie__img--wrapper">
                  <img src={data.Poster} alt="" />
                </figure>
              ) : (
                <div className="movie__img--skeleton"></div>
              )}
              <div className="movie__description">
                <div className="movie__title">{data.Title}</div>
                <div className="movie__info">
                  <div className="movie__year">{data.Year}</div>
                  <div className="movie__type">{data.Type}</div>
                </div>
              </div>
              <VisibilityIcon />
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Movies;
