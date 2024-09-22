import React from "react";
import Photo from "../../components/image-displays/photo/Photo";
import IMAGES from "../../common/images";
import Photos from "../../components/image-displays/photos/Photos";
import Hero from "../../components/hero/Hero";
import Head from "next/head";

const Portraits = () => {
  const allPhotos = [IMAGES.portraits.naga, IMAGES.portraits.mala, IMAGES.portraits.suma2, IMAGES.portraits.amrita, IMAGES.portraits.suma, IMAGES.portraits.mala2, IMAGES.portraits.amrita2, IMAGES.portraits.naga2];

  return (
    <>
      <Head>
        <title>Portraits - Swami Venkataramani</title>
      </Head>
      <main className="max-w-7xl mx-auto">
        <Hero title="Portraits">
          <p>Capturing a person's beauty, inside and out, and bringing out the spirit of their unique character is very rewarding. Here are my favorites.</p>
        </Hero>

        <Photo src={IMAGES.portraits.mala} alt="Mala" allPhotos={allPhotos} />

        <Photo src="storage.googleapis.com/swamiphoto/photos/portraits/naga-stanford/DSC_9227-Edit.jpg" alt="Naga" allPhotos={allPhotos} />

        <Photos layout="verticalPair">
          <Photo src={IMAGES.portraits.suma2} alt="Suma 2" allPhotos={allPhotos} />
          <Photo src={IMAGES.portraits.amrita} alt="Amrita" allPhotos={allPhotos} />
        </Photos>

        <Photo src={IMAGES.portraits.suma} alt="Suma" allPhotos={allPhotos} />
        <Photo src={IMAGES.portraits.mala2} alt="Mala 2" allPhotos={allPhotos} />
        <Photo src="https://storage.googleapis.com/swamiphoto/photos/portraits/anagha2/DSC_1309-Edit.jpg" alt="Anagha" allPhotos={allPhotos} />
        <Photo src={IMAGES.portraits.amrita2} alt="Amrita 2" allPhotos={allPhotos} />
        <Photo src="https://storage.googleapis.com/swamiphoto/photos/portraits/sunol/AR501496.jpg" alt="Amrita 2" allPhotos={allPhotos} />

        <Photos layout="verticalPair">
          <Photo src="https://storage.googleapis.com/swamiphoto/photos/portraits/anagha/DSC_0080.jpg" alt="Anagha" allPhotos={allPhotos} />
          <Photo src="https://storage.googleapis.com/swamiphoto/photos/portraits/anagha/DSC_0070.jpg" alt="Anagha" allPhotos={allPhotos} />
        </Photos>

        <Photo src="https://storage.googleapis.com/swamiphoto/photos/portraits/anagha/DSC_0068.jpg" alt="Amrita 2" allPhotos={allPhotos} />

        <Photo src="https://storage.googleapis.com/swamiphoto/photos/portraits/naga-sunflowers/AR500885-Edit-Edit.jpg" alt="Naga 2" allPhotos={allPhotos} />
        <Photo src="https://storage.googleapis.com/swamiphoto/photos/portraits/DSC_1451-Edit.jpg" alt="Naga 2" allPhotos={allPhotos} />
      </main>
    </>
  );
};

export default Portraits;
