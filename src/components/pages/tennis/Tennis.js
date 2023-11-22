import React from "react";
import Photo from "../../photo/Photo";
import IMAGES from "../../../common/images";
import Gallery from "../../gallery/Gallery";
import Hero from "../../hero/Hero";

const Tennis = () => {
  return (
    <main className="max-w-7xl mx-auto">
      <Hero title="Tennis">
        <p>Most of these images were taken in 2018 at the BNP Paribas Open in Indian Wells, where I was one of the official photographers.</p>
      </Hero>

      <Photo src={IMAGES.tennis.federer.fed1} alt="" />
      <Photo src={IMAGES.tennis.novak} alt="" />
      <Photo src={IMAGES.tennis.osaka} alt="" />
      <Photo src={IMAGES.tennis.grateful} alt="" />
      <Photo src={IMAGES.tennis.venus} alt="" />
      <Photo src={IMAGES.tennis.federer.fed2} alt="" />
      <Photo src={IMAGES.tennis.federer.fed3} alt="" />
      <Photo src={IMAGES.tennis.federer.fed4} alt="" />
      <Photo src={IMAGES.tennis.federer.fed5} alt="" />
      <Photo src={IMAGES.tennis.federer.fed6} alt="" />
      <Photo src={IMAGES.tennis.federer.fed7} alt="" />
      <Photo src={IMAGES.tennis.federer.fed8} alt="" />
      <Photo src={IMAGES.tennis.federer.fed9} alt="" />
      <Photo src={IMAGES.tennis.federer.fed10} alt="" />
      <Photo src={IMAGES.tennis.federer.fed11} alt="" />
      <Photo src={IMAGES.tennis.federer.fed12} alt="" />
    </main>
  );
};

export default Tennis;
