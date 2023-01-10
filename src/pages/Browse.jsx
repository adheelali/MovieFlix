import "./styles/browse.css";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { movieTextState } from "../../atoms/Atom";

function Browse() {
  const [searchState, setSearchState] = useState(false);
  const [executed, setExecuted] = useState(false);
  const [mountCount, setMountCount] = useState(0);
  const [searchText, setSearchText] = useRecoilState(movieTextState);

  async function searchMovies() {
    if (searchText !== "" && executed && searchText.trim()) {
      const { data } = await axios.get(
        `https://www.omdbapi.com/?i=tt3896198&apikey=c968a92&s=${searchText}`
      );
      console.log(data);
      setExecuted(false);
    } else if (searchText !== "" && mountCount === 0 && searchText.trim()) {
      const { data } = await axios.get(
        // `https://www.omdbapi.com/?i=tt3896198&apikey=c968a92&s=${searchText}`
        `https://www.omdbapi.com/?i=tt3896198&apikey=c968a92&s=${searchText}&page=2`
      );
      console.log(data);
      setExecuted(false);
    }
  }

  useEffect(() => {
    searchMovies();
    setMountCount(1);
  }, [searchState]);

  return (
    <div className="browse">
      <h3>Browse our movies</h3>
      <div className="browse__input--container">
        <SearchIcon
          onClick={() => setSearchState(!searchState)}
        />
        <input
          value={searchText}
          onKeyDown={(event) =>
            event.key === "Enter" && setSearchState(!searchState)
          }
          onChange={(event) => {
            setExecuted(true);
            setSearchText(event.target.value);
          }}
          placeholder="Search movies"
          type="text"
        />
      </div>
    </div>
  );
}

export default Browse;
