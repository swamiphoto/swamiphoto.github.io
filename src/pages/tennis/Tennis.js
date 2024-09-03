import React from "react";
import Photo from "../../components/image-displays/photo/Photo";
import IMAGES from "../../common/images";
import Hero from "../../components/hero/Hero";
import { useDarkenOnScroll } from "../../hooks/useDarkenOnScroll";
import { useNavigate } from "react-router-dom";

const Tennis = () => {
  useDarkenOnScroll();
  const navigate = useNavigate();

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

  const handlePhotoClick = (photoSrc) => {
    const currentIndex = allPhotos.indexOf(photoSrc);
    const previousImageUrls = allPhotos.slice(0, currentIndex);
    const nextImageUrls = allPhotos.slice(currentIndex + 1);

    const uniqueId = Object.keys(IMAGES.tennis.federer).find((key) => IMAGES.tennis.federer[key] === photoSrc) || Object.keys(IMAGES.tennis).find((key) => IMAGES.tennis[key] === photoSrc);

    if (uniqueId) {
      navigate(`/image/${uniqueId}`, {
        state: { previousImageUrls, nextImageUrls },
      });
    }
  };

  return (
    <main className="max-w-7xl mx-auto">
      <Hero title="Tennis">
        <p>Most of these images were shot in 2018 at the BNP Paribas Open in Indian Wells, where I was one of the official photographers.</p>
      </Hero>

      <Photo src={IMAGES.tennis.federer.fed1} alt="Fed 1" onClick={() => handlePhotoClick(IMAGES.tennis.federer.fed1)} />
      <Photo src={IMAGES.tennis.novak} alt="Novak" onClick={() => handlePhotoClick(IMAGES.tennis.novak)} />
      <Photo src={IMAGES.tennis.osaka} alt="Osaka" onClick={() => handlePhotoClick(IMAGES.tennis.osaka)} />
      <Photo src={IMAGES.tennis.grateful} alt="Grateful" onClick={() => handlePhotoClick(IMAGES.tennis.grateful)} />
      <Photo src={IMAGES.tennis.venus} alt="Venus" onClick={() => handlePhotoClick(IMAGES.tennis.venus)} />
      <Photo src={IMAGES.tennis.federer.fed2} alt="Fed 2" onClick={() => handlePhotoClick(IMAGES.tennis.federer.fed2)} />
      <Photo src={IMAGES.tennis.federer.fed3} alt="Fed 3" onClick={() => handlePhotoClick(IMAGES.tennis.federer.fed3)} />
      <Photo src={IMAGES.tennis.federer.fed4} alt="Fed 4" onClick={() => handlePhotoClick(IMAGES.tennis.federer.fed4)} />
      <Photo src={IMAGES.tennis.federer.fed5} alt="Fed 5" onClick={() => handlePhotoClick(IMAGES.tennis.federer.fed5)} />
      <Photo src={IMAGES.tennis.federer.fed6} alt="Fed 6" onClick={() => handlePhotoClick(IMAGES.tennis.federer.fed6)} />
      <Photo src={IMAGES.tennis.federer.fed7} alt="Fed 7" onClick={() => handlePhotoClick(IMAGES.tennis.federer.fed7)} />
      <Photo src={IMAGES.tennis.federer.fed8} alt="Fed 8" onClick={() => handlePhotoClick(IMAGES.tennis.federer.fed8)} />
      <Photo src={IMAGES.tennis.federer.fed9} alt="Fed 9" onClick={() => handlePhotoClick(IMAGES.tennis.federer.fed9)} />
      <Photo src={IMAGES.tennis.federer.fed10} alt="Fed 10" onClick={() => handlePhotoClick(IMAGES.tennis.federer.fed10)} />
      <Photo src={IMAGES.tennis.federer.fed11} alt="Fed 11" onClick={() => handlePhotoClick(IMAGES.tennis.federer.fed11)} />
      <Photo src={IMAGES.tennis.federer.fed12} alt="Fed 12" onClick={() => handlePhotoClick(IMAGES.tennis.federer.fed12)} />
    </main>
  );
};

export default Tennis;
