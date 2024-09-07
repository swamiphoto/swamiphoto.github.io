import React from "react";
import Photo from "../../components/image-displays/photo/Photo";
import IMAGES from "../../common/images";
import Hero from "../../components/hero/Hero";
import { useDarkenOnScroll } from "../../hooks/useDarkenOnScroll";

const Tennis = () => {
  useDarkenOnScroll();

  const allPhotos = [
    IMAGES.tennis.federer.fed1,
    IMAGES.tennis.novak,
    IMAGES.tennis.osaka,
    IMAGES.tennis.grateful,
    IMAGES.tennis.venus,
    IMAGES.tennis.federer.fed2,
    IMAGES.tennis.federer.fed3,
    IMAGES.tennis.federer.fed4,
    IMAGES.tennis.federer.fed5,
    IMAGES.tennis.federer.fed6,
    IMAGES.tennis.federer.fed7,
    IMAGES.tennis.federer.fed8,
    IMAGES.tennis.federer.fed9,
    IMAGES.tennis.federer.fed10,
    IMAGES.tennis.federer.fed11,
    IMAGES.tennis.federer.fed12,
  ];

  return (
    <main className="max-w-7xl mx-auto">
      <Hero title="Tennis">
        <p>Most of these images were shot in 2018 at the BNP Paribas Open in Indian Wells, where I was one of the official photographers.</p>
      </Hero>

      <Photo src={IMAGES.tennis.federer.fed1} alt="Fed 1" allPhotos={allPhotos} />
      <Photo src={IMAGES.tennis.novak} alt="Novak" allPhotos={allPhotos} />
      <Photo src={IMAGES.tennis.osaka} alt="Osaka" allPhotos={allPhotos} />
      <Photo src={IMAGES.tennis.grateful} alt="Grateful" allPhotos={allPhotos} />
      <Photo src={IMAGES.tennis.venus} alt="Venus" allPhotos={allPhotos} />
      <Photo src={IMAGES.tennis.federer.fed2} alt="Fed 2" allPhotos={allPhotos} />
      <Photo src={IMAGES.tennis.federer.fed3} alt="Fed 3" allPhotos={allPhotos} />
      <Photo src={IMAGES.tennis.federer.fed4} alt="Fed 4" allPhotos={allPhotos} />
      <Photo src={IMAGES.tennis.federer.fed5} alt="Fed 5" allPhotos={allPhotos} />
      <Photo src={IMAGES.tennis.federer.fed6} alt="Fed 6" allPhotos={allPhotos} />
      <Photo src={IMAGES.tennis.federer.fed7} alt="Fed 7" allPhotos={allPhotos} />
      <Photo src={IMAGES.tennis.federer.fed8} alt="Fed 8" allPhotos={allPhotos} />
      <Photo src={IMAGES.tennis.federer.fed9} alt="Fed 9" allPhotos={allPhotos} />
      <Photo src={IMAGES.tennis.federer.fed10} alt="Fed 10" allPhotos={allPhotos} />
      <Photo src={IMAGES.tennis.federer.fed11} alt="Fed 11" allPhotos={allPhotos} />
      <Photo src={IMAGES.tennis.federer.fed12} alt="Fed 12" allPhotos={allPhotos} />
      {/* More images */}
    </main>
  );
};

export default Tennis;
