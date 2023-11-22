import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/home/Home";
import About from "./components/pages/about/About";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import "./App.css";
import Headshots from "./components/pages/headshots/Headshots";
import Portraits from "./components/pages/portraits/Portraits";
import Bollwood from "./components/pages/bollywood/Bollywood";
import Tennis from "./components/pages/tennis/Tennis";

function App() {
  return (
    <Router>
      <div className="App bg-gray-200">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portraits" element={<Portraits />} />
          <Route path="/bollywood" element={<Bollwood />} />
          <Route path="/tennis" element={<Tennis />} />
          <Route path="/headshots" element={<Headshots />} />
          <Route path="/about" element={<About />} />
          {/* You can add a 404 Not Found page here */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
