import React, { useEffect } from "react";
import Hero from "../../components/hero/Hero";
import Photo from "../../components/photo/Photo";
import IMAGES from "../../common/images";
import Photos from "../../components/photos/Photos";
import "./Home.css";
import { useDarkenOnScroll } from "../../hooks/useDarkenOnScroll";

const Home = () => {
  useDarkenOnScroll();

  return (
    <main className="max-w-7xl mx-auto">
      <Hero title="Hi, I'm Swami.">
        <p>
          I’m an{" "}
          <a href="https://www.linkedin.com/in/swamiphoto/" target="_blank" rel="noopener noreferrer">
            engineer
          </a>
          ,{" "}
          <a href="https://dribbble.com/swamiphoto" target="_blank" rel="noopener noreferrer">
            designer
          </a>
          , and photographer. I've enjoyed shooting <a href="/bollywood">Bollywood</a> stars and tennis icons like <a href="/tennis">Federer</a>. I'm now focusing on <a href="/headshots">business headshots</a>, <a href="/portraits">portraits</a>, and <a href="/landscapes">landscapes</a>. Hope you
          enjoy my collection.
        </p>
      </Hero>

      <Photos layout="verticalPair">
        <Photo src={IMAGES.landscapes.comet} alt="Photo 1" />
        <Photo src={IMAGES.landscapes.astro} alt="Photo 2" />
      </Photos>
      <Photo src={IMAGES.landscapes.mac} alt="" />
      <Photo src={IMAGES.landscapes.fog} alt="" />
      <Photo src={IMAGES.landscapes.paris} alt="" />

      <Photos layout="verticalPair">
        <Photo src={IMAGES.landscapes.hotcreek} alt="Photo 1" />
        <Photo src={IMAGES.landscapes.falltrees} alt="Photo 2" />
      </Photos>
      <Photo src={IMAGES.landscapes.fuzzyfall} alt="" />
      <Photo src={IMAGES.landscapes.ghost} alt="" />
      <Photos layout="verticalPair">
        <Photo src={IMAGES.landscapes.walton} alt="Photo 1" />
        <Photo src={IMAGES.landscapes.kerala} alt="Photo 2" />
      </Photos>
      <Photo src={IMAGES.landscapes.pastel} alt="" />
      <Photo src={IMAGES.landscapes.alviso} alt="" />
      <Photo src={IMAGES.landscapes.alviso2} alt="" />
      <Photo src={IMAGES.landscapes.kerala2} alt="" />
    </main>
  );
};

export default Home;
