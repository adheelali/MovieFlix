import React from "react";
import "./styles/home.css";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { movieTextState } from "../../atoms/Atom";

function Home() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useRecoilState(movieTextState);

  return (
    <div className="home">
      <h1>Maldives most awarded free movie platform</h1>
      <h3>
        Find your favorite <span>movies and shows</span>
      </h3>
      <div className="input">
        <input value={searchText} onChange={(event) => setSearchText(event.target.value)} placeholder="Search movies" type="text" />
        <button disabled={!searchText.trim()}>
          <SearchIcon
            onClick={() => navigate('/browse')}
          />
        </button>
      </div>
    </div>
  );
}

export default Home;
