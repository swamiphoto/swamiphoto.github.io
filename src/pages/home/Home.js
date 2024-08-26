import React, { useEffect } from "react";
import Hero from "../../components/hero/Hero";
import Photo from "../../components/image-displays/photo/Photo";
import IMAGES from "../../common/images";
import Photos from "../../components/image-displays/photos/Photos";
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
          , and photographer. My heart has always been in <a href="/landscapes">landscapes</a> and nature, but I also enjoy <a href="/portraits">portraits</a>, and my past work includes photographing <a href="/bollywood">Bollywood stars</a> and <a href="/tennis">tennis icons</a>.{" "}
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
