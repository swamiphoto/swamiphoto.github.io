import React from "react";
import Photo from "../../components/photo/Photo";
import IMAGES from "../../common/images";
import Gallery from "../../components/gallery/Gallery";
import Hero from "../../components/hero/Hero";

const Portraits = () => {
  return (
    <main className="max-w-7xl mx-auto">
      <Hero title="Portraits">
        <p>There's nothing quite as fulfilling as capturing a person's character, beauty, and grace in a single frame. Over the years, I've enjoyed shooting some very kind-hearted and beautiful people. Here are some of my favorites.</p>
      </Hero>

      <Photo src={IMAGES.portraits.naga} alt="" />

      <Photo src={IMAGES.portraits.mala} alt="Photo 1" />

      <Gallery layout="verticalPair">
        <Photo src={IMAGES.portraits.suma2} alt="" />
        <Photo src={IMAGES.portraits.amrita} alt="Photo 2" />
      </Gallery>

      <Photo src={IMAGES.portraits.suma} alt="" />
      <Photo src={IMAGES.portraits.mala2} alt="" />
      <Photo src={IMAGES.portraits.amrita2} alt="" />
      <Photo src={IMAGES.portraits.naga2} alt="" />
    </main>
  );
};

export default Portraits;
