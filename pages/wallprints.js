import React, { useEffect } from "react";
import Photo from "../components/image-displays/photo/Photo";
import IMAGES from "../common/images";
import Photos from "../components/image-displays/photos/Photos";
import Hero from "../components/hero/Hero";
import Head from "next/head";

const WallPrints = () => {
  return (
    <>
      <Head>
        <title>Wall Prints — Swami Venkataramani</title>
      </Head>

      <main className="max-w-7xl mx-auto">
        <Hero title="Wall Prints" showSubNav={false}>
          <p>I'd be honored to have one of my photos in your living room. I picked out my favorite shots that I think would look great on your wall.</p>
        </Hero>

        <Photo
          src={IMAGES.landscapes.fog}
          layout="print"
          title="San Francisco"
          caption="Seeing the world's most famous bridge glowing in the fog at sunrise was a special experience. This photo was selected as Editor's Favorite by National Geographic, and was also showcased in the Escaype art gallery in San Francisco (2019)."
          alt="Golden Gate Bridge in fog"
          url="https://store.swamiphoto.com/wallprints/"
        />
        {/* <Photo src={IMAGES.landscapes.paris} layout="print" title="Paris" caption="Katrina Kaif who came to san jose for a nice concert." alt="" /> */}
        <Photo
          src={IMAGES.landscapes.gateway}
          layout="print"
          title="Mumbai"
          caption="The Gateway of India, one of India's most iconic monuments, is a historical symbol that represents both the colonization as well as the independence of India. My image was the official poster and backdrop at the Social Media Week conference in Mumbai (2016)."
          alt="Gateway of India"
          url="https://store.swamiphoto.com/wallprints/"
        />

        <Photo
          src={IMAGES.landscapes.mac}
          layout="print"
          title="Sierra"
          caption="A beautiful lake nestled in the Eastern Sierras, this is my attempt at recreating the scene featured in one of macOS's wallpaper."
          alt="A beautiful lake nestled in the Eastern Sierras"
          url="https://store.swamiphoto.com/wallprints/"
        />
        <Photo
          src={IMAGES.landscapes.pastel}
          layout="print"
          title="Pastel Storm"
          caption="While driving along the Eastern Sierra highway, I noticed a colorful storm brewing in the distance. Where I was, it was raining cats and dogs. I quickly pulled over to the shoulder, managed to take this shot, and rushed back to my car."
          alt="A colorful storm brewing in the distance"
          url="https://store.swamiphoto.com/wallprints/"
        />
        <Photo
          src={IMAGES.landscapes.kerala}
          layout="print"
          orientation="vertical"
          title="Kerala"
          caption="Captured on a tranquil evening in Kumarakom, Kerala, this photo was taken with my Ricoh camera while on a boat ride with my parents. The harmony of cold and warm tones here will look really nice in a large print."
          alt="A tranquil evening in Kumarakom, Kerala"
          url="https://store.swamiphoto.com/wallprints/"
        />
        <Photo
          src={IMAGES.landscapes.kerala2}
          layout="print"
          title="Kumarakom"
          caption="Another simple scene in Kerala that will look nice in a large matted frame. I love the subtle purple tones produced by my Ricoh camera."
          alt="Another simple scene in Kerala"
          url="https://store.swamiphoto.com/wallprints/"
        />
      </main>
    </>
  );
};

export default WallPrints;
