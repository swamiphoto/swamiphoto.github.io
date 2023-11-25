import React, { useEffect } from "react";
import Hero from "../../components/hero/Hero";
import Photo from "../../components/photo/Photo";
import IMAGES from "../../common/images";
import Gallery from "../../components/gallery/Gallery";
import "./Home.css";
import { useScrollContext } from "../../components/ScrollContext";

const Home = () => {
  const { isScrolled, setIsScrolled } = useScrollContext();

  const handleScroll = () => {
    const threshold = 50; // Adjust this value based on your preference
    setIsScrolled(window.scrollY > threshold);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [setIsScrolled]);

  useEffect(() => {
    if (isScrolled) {
      document.body.style.backgroundColor = "#343a40"; // Dark background color
      document.body.style.color = "#343a40"; // Light text color
      Array.from(document.links).forEach((link) => {
        link.style.color = "#343a40"; // Light color for links
      });
    } else {
      document.body.style.backgroundColor = ""; // Reset to original styles
      document.body.style.color = ""; // Reset to original text color
      Array.from(document.links).forEach((link) => {
        link.style.color = ""; // Reset links to original color
      });
    }
  }, [isScrolled]);

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
