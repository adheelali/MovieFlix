import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import Browse from "./pages/Browse";
import SelectedMovie from "./pages/Selectedmovie";
import Favories from "./pages/Favories";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/browse/:id" element={<SelectedMovie />} />
          <Route path="/favorites" element={<Favories />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
