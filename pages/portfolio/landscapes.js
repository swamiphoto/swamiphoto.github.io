import React from "react";
import Hero from "../../components/hero/Hero";
import Photo from "../../components/image-displays/photo/Photo";
import Photos from "../../components/image-displays/photos/Photos";
import IMAGES from "../../common/images";
import Head from "next/head";

const Landscapes = () => {
  const allPhotos = [
    IMAGES.landscapes.comet,
    IMAGES.landscapes.astro,
    IMAGES.landscapes.mac,
    IMAGES.landscapes.fog,
    IMAGES.landscapes.paris,
    IMAGES.landscapes.hotcreek,
    IMAGES.landscapes.falltrees,
    IMAGES.landscapes.fuzzyfall,
    IMAGES.landscapes.ghost,
    IMAGES.landscapes.walton,
    IMAGES.landscapes.kerala,
    IMAGES.landscapes.pastel,
    IMAGES.landscapes.alviso,
    IMAGES.landscapes.alviso2,
    IMAGES.landscapes.kerala2,
  ];

  return (
    <>
      <Head>
        <title>Landscapes - Swami Venkataramani</title>
      </Head>
      <main className="max-w-7xl mx-auto">
        <Hero title="Landscapes">
          <p>I hope these landscapes inspire you to wander and wonder and lose yourself in the breathtaking beauty of the world around us.</p>
        </Hero>

        <Photos layout="verticalPair">
          <Photo src={IMAGES.landscapes.comet} alt="Photo 1" allPhotos={allPhotos} />
          <Photo src={IMAGES.landscapes.astro} alt="Photo 2" allPhotos={allPhotos} />
        </Photos>

        <Photo src={IMAGES.landscapes.mac} alt="Mac" allPhotos={allPhotos} />
        <Photo src="https://storage.googleapis.com/swamiphoto/photos/landscapes/california/AR502884-Enhanced-NR-2.jpg" caption="The spectacular city, possibly the world's most, sandwiched in fog" />

        <Photo src={IMAGES.landscapes.fog} alt="Fog" allPhotos={allPhotos} />
        <Photo src={IMAGES.landscapes.paris} alt="Paris" allPhotos={allPhotos} />

        <Photos layout="verticalPair">
          <Photo src={IMAGES.landscapes.hotcreek} alt="Hot Creek" allPhotos={allPhotos} />
          <Photo src={IMAGES.landscapes.falltrees} alt="Fall Trees" allPhotos={allPhotos} />
        </Photos>

        <Photo src="https://storage.googleapis.com/swamiphoto/photos/landscapes/california/DSC_5618-Edit.jpg" alt="Fuzzy Fall" allPhotos={allPhotos} />
        <Photo src="https://storage.googleapis.com/swamiphoto/photos/landscapes/california/DSC_5702-Edit-Edit.jpg" alt="Fuzzy Fall" allPhotos={allPhotos} />
        <Photo src="https://storage.googleapis.com/swamiphoto/photos/landscapes/california/DSC_6303-Edit.jpg" alt="Fuzzy Fall" allPhotos={allPhotos} />
        <Photo src={IMAGES.landscapes.ghost} alt="Ghost" allPhotos={allPhotos} />

        <Photos layout="verticalPair">
          <Photo src={IMAGES.landscapes.walton} alt="Walton" allPhotos={allPhotos} />
          <Photo src={IMAGES.landscapes.kerala} alt="Kerala" allPhotos={allPhotos} />
        </Photos>

        <Photo src={IMAGES.landscapes.pastel} alt="Pastel" allPhotos={allPhotos} />
        <Photo src={IMAGES.landscapes.alviso} alt="Alviso" allPhotos={allPhotos} />
        <Photo src={IMAGES.landscapes.alviso2} alt="Alviso 2" allPhotos={allPhotos} />
        <Photo src={IMAGES.landscapes.kerala2} alt="Kerala 2" allPhotos={allPhotos} />

        <Photos layout="verticalPair">
          <Photo src="https://storage.googleapis.com/swamiphoto/photos/landscapes/poppy/DSC_4658-Edit-Edit.jpg" alt="poppy" allPhotos={allPhotos} />
          <Photo src="https://storage.googleapis.com/swamiphoto/photos/landscapes/poppy/DSC_4649-Edit-Edit.jpg" alt="poppy" allPhotos={allPhotos} />
        </Photos>

        <Photo src="https://storage.googleapis.com/swamiphoto/photos/landscapes/japan/DSC00179-Edit-4.jpg" alt="Kerala 2" allPhotos={allPhotos} />

        <Photos layout="verticalPair">
          <Photo src="https://storage.googleapis.com/swamiphoto/photos/landscapes/california/3%20bros.jpg" alt="poppy" allPhotos={allPhotos} />
          <Photo src="https://storage.googleapis.com/swamiphoto/photos/landscapes/california/image-asset%20(2).jpg" alt="poppy" allPhotos={allPhotos} />
        </Photos>

        <Photo src="https://storage.googleapis.com/swamiphoto/photos/landscapes/japan/DSC00324-Enhanced-NR.jpg" alt="Paris" allPhotos={allPhotos} />
      </main>
    </>
  );
};

export default Landscapes;
