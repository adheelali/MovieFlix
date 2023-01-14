import React, { useState } from "react";
import "./styles/home.css";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { movieTextState } from "../../atoms/Atom";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";

function Home() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useRecoilState(movieTextState);
  const [spinner, setSpinner] = useState(false);

  function navigateBrowse() {
    setSpinner(true);
    setTimeout(() => {
      navigate("/browse");
      setSpinner(false);
    }, 600);
  }

  return (
    <div className="home">
      <h1>Maldives most awarded free movie platform</h1>
      <h3>
        Find your favorite <span>movies and shows</span>
      </h3>
      <div className="input">
        <input
          value={searchText}
          onKeyDown={(event) =>
            event.key === "Enter" &&
            searchText !== "" &&
            searchText.trim() &&
            navigateBrowse()
          }
          onChange={(event) => setSearchText(event.target.value)}
          placeholder="Search movies"
          type="text"
        />
        <button disabled={!searchText.trim()} onClick={() => navigateBrowse()}>
          {spinner ? <RotateLeftIcon className="rotate" /> : <SearchIcon />}
        </button>
      </div>
    </div>
  );
}

export default Home;
