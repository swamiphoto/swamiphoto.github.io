import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Headshots from "./pages/headshots/Headshots";
import Portraits from "./pages/portraits/Portraits";
import Bollywood from "./pages/bollywood/Bollywood";
import Tennis from "./pages/tennis/Tennis";
import Prints from "./pages/prints/Prints";
import SingleGallery from "./pages/galleries/SingleGallery";
import Lightbox from "./components/image-displays/lightbox/Lightbox";
// import Galleries, { galleryData } from "./pages/galleries/Galleries";
import { ScrollProvider } from "./hooks/ScrollContext";
import "./App.css";

// Define noHeaderPaths for galleries and other pages
const otherNoHeaderPaths = ["/naga", "/nagabday", "/sunol", "/sunol2"];
const noHeaderPaths = [];

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
          {/* <Route path="/galleries" element={<Galleries />} /> */}
          <Route path="/headshots" element={<Headshots />} />
          <Route path="/galleries/:gallerySlug/:view?" element={<SingleGallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/wallprints" element={<Prints />} />
          <Route path="/image/:imagePath*" element={<Lightbox />} />
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
