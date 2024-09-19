import React from "react";
import Photo from "../../components/image-displays/photo/Photo";
import IMAGES from "../../common/images";
import Photos from "../../components/image-displays/photos/Photos";
import Hero from "../../components/hero/Hero";
import Head from "next/head";

const Bollywood = () => {
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

  return (
    <>
      <Head>
        <title>Bollywood - Swami Venkataramani</title>
      </Head>
      <main className="max-w-7xl mx-auto">
        <Hero title="Bollywood">
          <p>A piece of Bollywood's cinematic magic, captured through my lens, with all the glamour, the vibrant colors, and the familiar faces we all love.</p>
        </Hero>

        <Photo src={IMAGES.bollywood.katrina} alt="Katrina" allPhotos={allPhotos} />
        <Photo src={IMAGES.bollywood.katrina2} alt="Katrina 2" allPhotos={allPhotos} />

        <Photos layout="verticalPair">
          <Photo src={IMAGES.bollywood.nargis} alt="Nargis" allPhotos={allPhotos} />
          <Photo src={IMAGES.bollywood.alia} alt="Alia" allPhotos={allPhotos} />
        </Photos>

        <Photo src={IMAGES.bollywood.bollywood} alt="Bollywood" allPhotos={allPhotos} />
        <Photo src={IMAGES.bollywood.atif} alt="Atif" allPhotos={allPhotos} />
        <Photo src={IMAGES.bollywood.nargis2} alt="Nargis 2" allPhotos={allPhotos} />
        <Photo src={IMAGES.bollywood.glamour} alt="Glamour" allPhotos={allPhotos} />
        <Photo src={IMAGES.bollywood.nargis3} alt="Nargis 3" allPhotos={allPhotos} />
        <Photo src={IMAGES.bollywood.prabhu} alt="Prabhu" allPhotos={allPhotos} />
        <Photo src={IMAGES.bollywood.shreya} alt="Shreya" allPhotos={allPhotos} />
      </main>
    </>
  );
};

export default Bollywood;
