import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import Browse from "./pages/Browse";
import SelectedMovie from "./pages/Selectedmovie";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/browse/:id" element={<SelectedMovie />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
