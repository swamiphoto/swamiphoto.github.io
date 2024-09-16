import React from "react";
import Photo from "../../components/image-displays/photo/Photo";
import IMAGES from "../../common/images";
import Photos from "../../components/image-displays/photos/Photos";
import Hero from "../../components/hero/Hero";

const Portraits = () => {
  const allPhotos = [IMAGES.portraits.naga, IMAGES.portraits.mala, IMAGES.portraits.suma2, IMAGES.portraits.amrita, IMAGES.portraits.suma, IMAGES.portraits.mala2, IMAGES.portraits.amrita2, IMAGES.portraits.naga2];

  return (
    <main className="max-w-7xl mx-auto">
      <Hero title="Portraits">
        <p>Capturing a person's beauty, inside and out, and bringing out the spirit of their unique character is very rewarding. Here are some favorites.</p>
      </Hero>

      <Photo src={IMAGES.portraits.naga} alt="Naga" allPhotos={allPhotos} />
      <Photo src={IMAGES.portraits.mala} alt="Mala" allPhotos={allPhotos} />

      <Photos layout="verticalPair">
        <Photo src={IMAGES.portraits.suma2} alt="Suma 2" allPhotos={allPhotos} />
        <Photo src={IMAGES.portraits.amrita} alt="Amrita" allPhotos={allPhotos} />
      </Photos>

      <Photo src={IMAGES.portraits.suma} alt="Suma" allPhotos={allPhotos} />
      <Photo src={IMAGES.portraits.mala2} alt="Mala 2" allPhotos={allPhotos} />
      <Photo src="https://storage.googleapis.com/swamiphoto/photos/portraits/anagha2/DSC_1309-Edit.jpg" alt="Anagha" allPhotos={allPhotos} />
      <Photo src={IMAGES.portraits.amrita2} alt="Amrita 2" allPhotos={allPhotos} />
      <Photo src={IMAGES.portraits.naga2} alt="Naga 2" allPhotos={allPhotos} />
    </main>
  );
};

export default Portraits;
