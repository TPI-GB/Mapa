import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header/Header";
import SelectTextField from "./components/SelectTextField";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Routes>
          <Route path="/header" element={<Header />} />
        </Routes>
        <Routes>
          <Route path="/selectTextField" element={<SelectTextField />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
