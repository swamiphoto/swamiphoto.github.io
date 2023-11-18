import React from "react";
import "./Home.css"; // Assuming you have a Home.css for your styling
import Hero from "./Hero";
import Photo from "../photo/Photo";
import IMAGES from "../common/images";

const Home = () => {
  return (
    <main className="max-w-7xl mx-auto">
      <Hero />
      <Photo src={IMAGES.landscapes.fog} alt="Foggy morning at Golden Gate BridgeF" />
    </main>
  );
};

export default Home;
