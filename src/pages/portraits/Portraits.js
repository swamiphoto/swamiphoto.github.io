import React from "react";
import Photo from "../../components/photo/Photo";
import IMAGES from "../../common/images";
import Photos from "../../components/photos/Photos";
import Hero from "../../components/hero/Hero";
import { useDarkenOnScroll } from "../../hooks/useDarkenOnScroll";

const Portraits = () => {
  useDarkenOnScroll();

  return (
    <main className="max-w-7xl mx-auto">
      <Hero title="Portraits">
        <p>Capturing a person's character, beauty, and grace in a single frame is incredibly fulfilling. Over the years, I've photographed some truly kind-hearted and beautiful individuals. Here are a few of my favorites.</p>
      </Hero>

      <Photo src={IMAGES.portraits.naga} alt="" />

      <Photo src={IMAGES.portraits.mala} alt="Photo 1" />

      <Photos layout="verticalPair">
        <Photo src={IMAGES.portraits.suma2} alt="" />
        <Photo src={IMAGES.portraits.amrita} alt="Photo 2" />
      </Photos>

      <Photo src={IMAGES.portraits.suma} alt="" />
      <Photo src={IMAGES.portraits.mala2} alt="" />
      <Photo src={IMAGES.portraits.amrita2} alt="" />
      <Photo src={IMAGES.portraits.naga2} alt="" />
    </main>
  );
};

export default Portraits;
