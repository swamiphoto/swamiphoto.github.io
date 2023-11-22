import React from "react";
import "./Home.css"; // Assuming you have a Home.css for your styling
import Hero from "../../hero/Hero";
import Photo from "../../photo/Photo";
import IMAGES from "../../../common/images";
import Gallery from "../../gallery/Gallery";
import SubNav from "../../subnav/SubNav";

const Home = () => {
  return (
    <main className="max-w-7xl mx-auto">
      <Hero title="Hi, I'm Swami.">
        <p>
          I’m an{" "}
          <a href="https://www.linkedin.com/in/swamiphoto/" target="_blank">
            engineer
          </a>
          ,{" "}
          <a href="https://dribbble.com/swamiphoto" target="_blank">
            designer
          </a>
          , and <a href="">photographer</a>. I've enjoyed shooting <a href="/bollywood">Bollywood</a> stars and tennis icons like <a href="/tennis">Federer</a>. I'm now focusing on <a href="/headshots">business headshots</a>, <a href="/portraits">portraits</a>, and{" "}
          <a href="/landscapes">landscapes</a>. Hope you enjoy my collection.
        </p>
      </Hero>

      <Gallery layout="verticalPair">
        <Photo src={IMAGES.landscapes.comet} alt="Photo 1" />
        <Photo src={IMAGES.landscapes.astro} alt="Photo 2" />
      </Gallery>
      <Photo src={IMAGES.landscapes.mac} alt="" />
      <Photo src={IMAGES.landscapes.fog} alt="" />
      <Photo src={IMAGES.landscapes.paris} alt="" />

      <Gallery layout="verticalPair">
        <Photo src={IMAGES.landscapes.hotcreek} alt="Photo 1" />
        <Photo src={IMAGES.landscapes.falltrees} alt="Photo 2" />
      </Gallery>
      <Photo src={IMAGES.landscapes.fuzzyfall} alt="" />
      <Photo src={IMAGES.landscapes.ghost} alt="" />
      <Gallery layout="verticalPair">
        <Photo src={IMAGES.landscapes.walton} alt="Photo 1" />
        <Photo src={IMAGES.landscapes.kerala} alt="Photo 2" />
      </Gallery>
      <Photo src={IMAGES.landscapes.pastel} alt="" />
      <Photo src={IMAGES.landscapes.alviso} alt="" />
      <Photo src={IMAGES.landscapes.alviso2} alt="" />
    </main>
  );
};

export default Home;
