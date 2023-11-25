import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import "./App.css";
import Headshots from "./pages/headshots/Headshots";
import Portraits from "./pages/portraits/Portraits";
import Bollwood from "./pages/bollywood/Bollywood";
import Tennis from "./pages/tennis/Tennis";
import { ScrollProvider } from "./components/ScrollContext";

function App() {
  return (
    <ScrollProvider>
      <Router>
        <div className="App">
          <Header />
          <div className="px-4 md:px-0">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/portraits" element={<Portraits />} />
              <Route path="/bollywood" element={<Bollwood />} />
              <Route path="/tennis" element={<Tennis />} />
              <Route path="/headshots" element={<Headshots />} />
              <Route path="/about" element={<About />} />
              {/* You can add a 404 Not Found page here */}
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ScrollProvider>
  );
}

export default App;
