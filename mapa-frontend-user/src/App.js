import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
<<<<<<< Updated upstream
import Footer from "./components/Footer/Footer";
import SelectTextField from "./components/SelectTextField";
=======
import Prueba from "./components/Home/Prueba";
>>>>>>> Stashed changes

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
<<<<<<< Updated upstream
        </Routes>       
        <Routes>
          <Route path="/selectTextField" element={<SelectTextField />} />
=======
        </Routes>
        <Routes>
          <Route path="/prueba" element={<Prueba />} />
>>>>>>> Stashed changes
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
