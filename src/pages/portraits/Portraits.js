import React from "react";
import Photo from "../../components/image-displays/photo/Photo";
import IMAGES from "../../common/images";
import Photos from "../../components/image-displays/photos/Photos";
import Hero from "../../components/hero/Hero";
import { useDarkenOnScroll } from "../../hooks/useDarkenOnScroll";
import { useNavigate } from "react-router-dom";

const Portraits = () => {
  // useDarkenOnScroll();
  const navigate = useNavigate();

  const allPhotos = [IMAGES.portraits.naga, IMAGES.portraits.mala, IMAGES.portraits.suma2, IMAGES.portraits.amrita, IMAGES.portraits.suma, IMAGES.portraits.mala2, IMAGES.portraits.amrita2, IMAGES.portraits.naga2];

  const handlePhotoClick = (photoSrc) => {
    const currentIndex = allPhotos.indexOf(photoSrc);
    const previousImageUrls = allPhotos.slice(0, currentIndex);
    const nextImageUrls = allPhotos.slice(currentIndex + 1);

    const uniqueId = Object.keys(IMAGES.portraits).find((key) => IMAGES.portraits[key] === photoSrc);

    if (uniqueId) {
      navigate(`/image/${uniqueId}`, {
        state: { previousImageUrls, nextImageUrls },
      });
    }
  };

  return (
    <main className="max-w-7xl mx-auto">
      <Hero title="Portraits">
        <p>Capturing a person's character, beauty, and grace in a single frame is incredibly fulfilling. Over the years, I've photographed some truly kind-hearted and beautiful individuals. Here are a few of my favorites.</p>
      </Hero>

      <Photo src={IMAGES.portraits.naga} alt="Naga" onClick={() => handlePhotoClick(IMAGES.portraits.naga)} />
      <Photo src={IMAGES.portraits.mala} alt="Mala" onClick={() => handlePhotoClick(IMAGES.portraits.mala)} />

      <Photos layout="verticalPair">
        <Photo src={IMAGES.portraits.suma2} alt="Suma 2" onClick={() => handlePhotoClick(IMAGES.portraits.suma2)} />
        <Photo src={IMAGES.portraits.amrita} alt="Amrita" onClick={() => handlePhotoClick(IMAGES.portraits.amrita)} />
      </Photos>

      <Photo src={IMAGES.portraits.suma} alt="Suma" onClick={() => handlePhotoClick(IMAGES.portraits.suma)} />
      <Photo src={IMAGES.portraits.mala2} alt="Mala 2" onClick={() => handlePhotoClick(IMAGES.portraits.mala2)} />
      <Photo src={IMAGES.portraits.amrita2} alt="Amrita 2" onClick={() => handlePhotoClick(IMAGES.portraits.amrita2)} />
      <Photo src={IMAGES.portraits.naga2} alt="Naga 2" onClick={() => handlePhotoClick(IMAGES.portraits.naga2)} />
    </main>
  );
};

export default Portraits;
