import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Headshots from "./pages/headshots/Headshots";
import Portraits from "./pages/portraits/Portraits";
import Bollywood from "./pages/bollywood/Bollywood";
import Tennis from "./pages/tennis/Tennis";
import { ScrollProvider } from "./hooks/ScrollContext";
import Prints from "./pages/prints/Prints";
import Naga from "./pages/portraits/galleries/Naga";
import "./App.css";

const noHeaderPaths = ["/naga", "/anotherPathWithoutHeader", "/oneMorePath"]; // Add more paths as needed

const MainContent = () => {
  const location = useLocation();

  return (
    <>
      {!noHeaderPaths.includes(location.pathname) && <Header />}
      <div className="px-4 md:px-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portraits" element={<Portraits />} />
          <Route path="/bollywood" element={<Bollywood />} />
          <Route path="/tennis" element={<Tennis />} />
          <Route path="/headshots" element={<Headshots />} />
          <Route path="/about" element={<About />} />
          <Route path="/wallprints" element={<Prints />} />
          <Route path="/naga" element={<Naga />} />
          {/* You can add a 404 Not Found page here */}
        </Routes>
      </div>
      {!noHeaderPaths.includes(location.pathname) && <Footer />}
    </>
  );
};

function App() {
  return (
    <ScrollProvider>
      <Router>
        <div className="App">
          <MainContent />
        </div>
      </Router>
    </ScrollProvider>
  );
}

export default App;
