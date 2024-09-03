import React from "react";
import Photo from "../../components/image-displays/photo/Photo";
import IMAGES from "../../common/images";
import Photos from "../../components/image-displays/photos/Photos";
import Hero from "../../components/hero/Hero";
import { useDarkenOnScroll } from "../../hooks/useDarkenOnScroll";
import { useNavigate } from "react-router-dom";

const Bollywood = () => {
  useDarkenOnScroll();
  const navigate = useNavigate();

  const allPhotos = [
    IMAGES.bollywood.katrina,
    IMAGES.bollywood.katrina2,
    IMAGES.bollywood.nargis,
    IMAGES.bollywood.alia,
    IMAGES.bollywood.bollywood,
    IMAGES.bollywood.atif,
    IMAGES.bollywood.nargis2,
    IMAGES.bollywood.glamour,
    IMAGES.bollywood.nargis3,
    IMAGES.bollywood.prabhu,
    IMAGES.bollywood.shreya,
  ];

  const handlePhotoClick = (photoSrc) => {
    const currentIndex = allPhotos.indexOf(photoSrc);
    const previousImageUrls = allPhotos.slice(0, currentIndex);
    const nextImageUrls = allPhotos.slice(currentIndex + 1);

    const uniqueId = Object.keys(IMAGES.bollywood).find((key) => IMAGES.bollywood[key] === photoSrc);

    if (uniqueId) {
      navigate(`/image/${uniqueId}`, {
        state: { previousImageUrls, nextImageUrls },
      });
    }
  };

  return (
    <main className="max-w-7xl mx-auto">
      <Hero title="Bollywood">
        <p>
          I was fortunate to shoot some talented Bollywood actors, directors, and musicians. If you'd like to know how I got this opportunity, I've written about it{" "}
          <a href="https://swamiphoto.medium.com/the-power-of-writing-down-efefb72a1f3a" target="_blank" rel="noopener noreferrer">
            here
          </a>
          . Hope you enjoy this collection.
        </p>
      </Hero>

      <Photo src={IMAGES.bollywood.katrina} alt="Katrina" onClick={() => handlePhotoClick(IMAGES.bollywood.katrina)} />
      <Photo src={IMAGES.bollywood.katrina2} alt="Katrina 2" onClick={() => handlePhotoClick(IMAGES.bollywood.katrina2)} />

      <Photos layout="verticalPair">
        <Photo src={IMAGES.bollywood.nargis} alt="Nargis" onClick={() => handlePhotoClick(IMAGES.bollywood.nargis)} />
        <Photo src={IMAGES.bollywood.alia} alt="Alia" onClick={() => handlePhotoClick(IMAGES.bollywood.alia)} />
      </Photos>

      <Photo src={IMAGES.bollywood.bollywood} alt="Bollywood" onClick={() => handlePhotoClick(IMAGES.bollywood.bollywood)} />
      <Photo src={IMAGES.bollywood.atif} alt="Atif" onClick={() => handlePhotoClick(IMAGES.bollywood.atif)} />
      <Photo src={IMAGES.bollywood.nargis2} alt="Nargis 2" onClick={() => handlePhotoClick(IMAGES.bollywood.nargis2)} />
      <Photo src={IMAGES.bollywood.glamour} alt="Glamour" onClick={() => handlePhotoClick(IMAGES.bollywood.glamour)} />
      <Photo src={IMAGES.bollywood.nargis3} alt="Nargis 3" onClick={() => handlePhotoClick(IMAGES.bollywood.nargis3)} />
      <Photo src={IMAGES.bollywood.prabhu} alt="Prabhu" onClick={() => handlePhotoClick(IMAGES.bollywood.prabhu)} />
      <Photo src={IMAGES.bollywood.shreya} alt="Shreya" onClick={() => handlePhotoClick(IMAGES.bollywood.shreya)} />
    </main>
  );
};

export default Bollywood;
