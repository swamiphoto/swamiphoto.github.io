import React from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../../components/hero/Hero";
import Photo from "../../components/image-displays/photo/Photo";
import IMAGES, { generateUniqueId } from "../../common/images";
import Photos from "../../components/image-displays/photos/Photos";
import "./Home.css";
import { useDarkenOnScroll } from "../../hooks/useDarkenOnScroll";

const Home = () => {
  useDarkenOnScroll();
  const navigate = useNavigate();

  const allPhotos = [
    IMAGES.landscapes.comet,
    IMAGES.landscapes.astro,
    IMAGES.landscapes.mac,
    // add the rest of the images here...
  ];

  const handlePhotoClick = (photoSrc) => {
    // Extract the key by finding the corresponding value in the IMAGES object
    const key = Object.keys(IMAGES.landscapes).find((k) => IMAGES.landscapes[k] === photoSrc);
    const uniqueId = generateUniqueId(key);

    const currentIndex = allPhotos.indexOf(photoSrc);
    const previousImageUrls = allPhotos.slice(0, currentIndex);
    const nextImageUrls = allPhotos.slice(currentIndex + 1);

    if (uniqueId) {
      navigate(`/image/${uniqueId}`, {
        state: { previousImageUrls, nextImageUrls },
      });
    }
  };

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
        <Photo src={IMAGES.landscapes.comet} alt="Photo 1" onClick={() => handlePhotoClick(IMAGES.landscapes.comet)} />
        <Photo src={IMAGES.landscapes.astro} alt="Photo 2" onClick={() => handlePhotoClick(IMAGES.landscapes.astro)} />
      </Photos>
      <Photo src={IMAGES.landscapes.mac} alt="" onClick={() => handlePhotoClick(IMAGES.landscapes.mac)} />
      <Photo src={IMAGES.landscapes.fog} alt="" onClick={() => handlePhotoClick(IMAGES.landscapes.fog)} />
      <Photo src={IMAGES.landscapes.paris} alt="" onClick={() => handlePhotoClick(IMAGES.landscapes.paris)} />

      {/* Repeat for other photos */}
    </main>
  );
};

export default Home;
