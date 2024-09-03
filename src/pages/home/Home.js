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

  // Array containing all photo URLs from the landscapes category
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

  // Handle photo click and calculate previous/next images
  const handlePhotoClick = (photoSrc) => {
    const currentIndex = allPhotos.indexOf(photoSrc); // Find the index of the clicked photo
    const previousImageUrls = allPhotos.slice(0, currentIndex); // Get previous images
    const nextImageUrls = allPhotos.slice(currentIndex + 1); // Get next images

    // Find the unique key for the current image
    const key = Object.keys(IMAGES.landscapes).find((k) => IMAGES.landscapes[k] === photoSrc);
    const uniqueId = generateUniqueId(key); // Generate unique ID based on the key

    if (uniqueId) {
      // Navigate to the Lightbox with previous and next image URLs
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
          <a href="https://dribbble.com/swamiphoto/" target="_blank" rel="noopener noreferrer">
            designer
          </a>
          , and photographer. My heart has always been in <a href="/landscapes">landscapes</a> and nature, but I also enjoy <a href="/portraits">portraits</a>.{" "}
        </p>
      </Hero>

      <Photos layout="verticalPair">
        <Photo
          src={IMAGES.landscapes.comet}
          alt="Photo 1"
          onClick={() => handlePhotoClick(IMAGES.landscapes.comet)} // Pass click handler
        />
        <Photo
          src={IMAGES.landscapes.astro}
          alt="Photo 2"
          onClick={() => handlePhotoClick(IMAGES.landscapes.astro)} // Pass click handler
        />
      </Photos>
      <Photo
        src={IMAGES.landscapes.mac}
        alt="Mac"
        onClick={() => handlePhotoClick(IMAGES.landscapes.mac)} // Pass click handler
      />
      <Photo
        src={IMAGES.landscapes.fog}
        alt="Fog"
        onClick={() => handlePhotoClick(IMAGES.landscapes.fog)} // Pass click handler
      />
      <Photo
        src={IMAGES.landscapes.paris}
        alt="Paris"
        onClick={() => handlePhotoClick(IMAGES.landscapes.paris)} // Pass click handler
      />

      <Photos layout="verticalPair">
        <Photo
          src={IMAGES.landscapes.hotcreek}
          alt="Hot Creek"
          onClick={() => handlePhotoClick(IMAGES.landscapes.hotcreek)} // Pass click handler
        />
        <Photo
          src={IMAGES.landscapes.falltrees}
          alt="Fall Trees"
          onClick={() => handlePhotoClick(IMAGES.landscapes.falltrees)} // Pass click handler
        />
      </Photos>
      <Photo
        src={IMAGES.landscapes.fuzzyfall}
        alt="Fuzzy Fall"
        onClick={() => handlePhotoClick(IMAGES.landscapes.fuzzyfall)} // Pass click handler
      />
      <Photo
        src={IMAGES.landscapes.ghost}
        alt="Ghost"
        onClick={() => handlePhotoClick(IMAGES.landscapes.ghost)} // Pass click handler
      />

      <Photos layout="verticalPair">
        <Photo
          src={IMAGES.landscapes.walton}
          alt="Walton"
          onClick={() => handlePhotoClick(IMAGES.landscapes.walton)} // Pass click handler
        />
        <Photo
          src={IMAGES.landscapes.kerala}
          alt="Kerala"
          onClick={() => handlePhotoClick(IMAGES.landscapes.kerala)} // Pass click handler
        />
      </Photos>
      <Photo
        src={IMAGES.landscapes.pastel}
        alt="Pastel"
        onClick={() => handlePhotoClick(IMAGES.landscapes.pastel)} // Pass click handler
      />
      <Photo
        src={IMAGES.landscapes.alviso}
        alt="Alviso"
        onClick={() => handlePhotoClick(IMAGES.landscapes.alviso)} // Pass click handler
      />
      <Photo
        src={IMAGES.landscapes.alviso2}
        alt="Alviso 2"
        onClick={() => handlePhotoClick(IMAGES.landscapes.alviso2)} // Pass click handler
      />
      <Photo
        src={IMAGES.landscapes.kerala2}
        alt="Kerala 2"
        onClick={() => handlePhotoClick(IMAGES.landscapes.kerala2)} // Pass click handler
      />
    </main>
  );
};

export default Home;
