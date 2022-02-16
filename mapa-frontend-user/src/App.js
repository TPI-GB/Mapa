import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Footer from "./components/Footer/Footer";
import Prueba from "./components/Home/Prueba";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Routes>
          <Route path="/prueba" element={<Prueba />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
