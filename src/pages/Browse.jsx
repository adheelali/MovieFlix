import "./styles/browse.css";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { movieTextState } from "../../atoms/Atom";

function Browse() {
  const [searchState, setSearchState] = useState(false);
  const [searchText, setSearchText] = useRecoilState(movieTextState);

  async function searchMovies() {
    if (searchText !== "") {
      const { data } = await axios.get(
        `https://www.omdbapi.com/?i=tt3896198&apikey=c968a92&s=${searchText}`
      );
      console.log(data);
    }
  }

  useEffect(() => {
    searchMovies();
  }, [searchState]);

  return (
    <div className="browse">
      <h3>Browse our movies</h3>
      <div className="browse__input--container">
        <SearchIcon
          onKeyDown={(event) => event.key === "Enter" && setSearchState(!searchState)}
          onClick={() => setSearchState(!searchState)}
        />
        <input
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          placeholder="Search movies"
          type="text"
        />
      </div>
    </div>
  );
}

export default Browse;
