import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import About from "./components/about/About";
import Header from "./components/common/header/Header";
import Footer from "./components/common/footer/Footer";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App bg-slate-100">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          {/* You can add a 404 Not Found page here */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
