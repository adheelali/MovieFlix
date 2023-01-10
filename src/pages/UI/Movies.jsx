import React from "react";
import './movies.css'

function Movies({ data }) {
  return (
    <main>
      <div className="movie__list">
        {data?.Search.map((data) => (
          <div className="movie__wrapper">
            <figure className="movie__img--wrapper">
              <img src={data.Poster} alt="" />
            </figure>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Movies;
