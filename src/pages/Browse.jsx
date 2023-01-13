import "./styles/browse.css";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { movieTextState } from "../../atoms/Atom";
import Movies from "../components/Movies";

function Browse() {
  // API request for once
  const [searchState, setSearchState] = useState(false);
  const [mountCount, setMountCount] = useState(0);
  const [executed, setExecuted] = useState(false);
  // data
  const [inputedText, setInputedText] = useState("");
  const [searchText, setSearchText] = useRecoilState(movieTextState);
  const [searchData, setSearchData] = useState([]);

  // const options = {
  //   method: "GET",
  //   url: "https://imdb8.p.rapidapi.com/auto-complete",
  //   params: { q: `${searchText}` },
  //   headers: {
  //     "X-RapidAPI-Key": "0e78b6e4c3msh9457005afd28fd2p170861jsn77597c6b93ff",
  //     "X-RapidAPI-Host": "imdb8.p.rapidapi.com",
  //   },
  // };

  async function searchMovies() {
    if (searchText !== "" && executed && searchText.trim()) {
      const { data } = await axios.get(
        `https://www.omdbapi.com/?&apikey=c968a92&s=${searchText}`
      );
      setSearchData(data);
      setExecuted(false);
    } else if (searchText !== "" && mountCount === 0 && searchText.trim()) {
      const { data } = await axios.get(
        `https://www.omdbapi.com/?&apikey=c968a92&s=${searchText}`
      );
      setSearchData(data);
      setExecuted(false);
    }

    // if (searchText !== "" && executed && searchText.trim()) {
    //   const { data }  = await axios.request(options);
    //   setSearchData(data);
    //   console.log(data);
    //   setExecuted(false);
    // }
  }

  useEffect(() => {
    searchMovies();
    setInputedText(searchText);
    setMountCount(1);
  }, [searchState]);

  return (
    <>
      <div className="browse">
        <h3>Browse our movies</h3>
        <div className="browse__input--container">
          <SearchIcon
            onClick={() => {
              setSearchState(!searchState);
              setInputedText(searchText);
            }}
          />
          <input
            value={searchText}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                setSearchState(!searchState);
                setInputedText(searchText);
              }
            }}
            onChange={(event) => {
              setExecuted(true);
              setSearchText(event.target.value);
            }}
            placeholder="Search movies"
            type="text"
          />
        </div>
      </div>
      <div className="browse__main">
        <div className="browse__main--header">
          Search results{" "}
          {inputedText && (
            <span>
              for <span className="color">{`"${inputedText}"`}</span>
            </span>
          )}
        </div>
        <Movies data={searchData} />
      </div>
    </>
  );
}

export default Browse;
