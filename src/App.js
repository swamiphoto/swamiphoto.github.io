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
import NagaBday from "./pages/portraits/slideshows/NagaBday";
import Naga from "./pages/portraits/slideshows/Naga";
import Sunol from "./pages/portraits/slideshows/Sunol";
import Sunol2 from "./pages/portraits/slideshows/Sunol2";
import "./App.css";
import Recent from "./pages/recent/Recent";

const noHeaderPaths = ["/naga", "/nagabday", "/sunol", "/sunol2", "/recent"];

const MainContent = () => {
  const location = useLocation();
  const isNoHeaderPath = noHeaderPaths.includes(location.pathname);

  return (
    <>
      {!isNoHeaderPath && <Header />}
      <div className={`${isNoHeaderPath ? "" : "px-4 md:px-0"}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portraits" element={<Portraits />} />
          <Route path="/bollywood" element={<Bollywood />} />
          <Route path="/tennis" element={<Tennis />} />
          <Route path="/headshots" element={<Headshots />} />
          <Route path="/about" element={<About />} />
          <Route path="/recent" element={<Recent />} />
          <Route path="/wallprints" element={<Prints />} />
          <Route path="/nagabday" element={<NagaBday />} />
          <Route path="/naga" element={<Naga />} />
          <Route path="/sunol" element={<Sunol />} />
          <Route path="/sunol2" element={<Sunol2 />} />
          {/* You can add a 404 Not Found page here */}
        </Routes>
      </div>
      {!isNoHeaderPath && <Footer />}
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
