import React from "react";
import Photo from "../../components/photo/Photo";
import IMAGES from "../../common/images";
import Gallery from "../../components/gallery/Gallery";
import Hero from "../../components/hero/Hero";

const Bollwood = () => {
  return (
    <main className="max-w-7xl mx-auto">
      <Hero title="Bollywood">
        <p>
          I've had the previlige of shooting some of the most talented and famous Bollywood actors, directors, and musicians. If you'd like to know how I got this opportunity, I've written about it{" "}
          <a href="https://swamiphoto.medium.com/the-power-of-writing-down-efefb72a1f3a" target="_blank">
            here
          </a>
          . Hope you enjoy this collection.
        </p>
      </Hero>

      <Photo src={IMAGES.bollywood.katrina} alt="" />

      <Photo src={IMAGES.bollywood.katrina2} alt="Photo 1" />

      <Gallery layout="verticalPair">
        <Photo src={IMAGES.bollywood.nargis} alt="" />
        <Photo src={IMAGES.bollywood.alia} alt="Photo 2" />
      </Gallery>

      <Photo src={IMAGES.bollywood.bollywood} alt="" />
      <Photo src={IMAGES.bollywood.atif} alt="" />
      <Photo src={IMAGES.bollywood.nargis2} alt="" />
      <Photo src={IMAGES.bollywood.glamour} alt="" />
      <Photo src={IMAGES.bollywood.nargis3} alt="" />
      <Photo src={IMAGES.bollywood.prabhu} alt="" />
      <Photo src={IMAGES.bollywood.shreya} alt="" />
    </main>
  );
};

export default Bollwood;
