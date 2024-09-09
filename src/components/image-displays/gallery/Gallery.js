import React, { useEffect, useState, useRef } from "react";
import MasonryGallery from "./masonry-gallery/MasonryGallery";
import HorizontalGallery from "./horizontal-gallery/HorizontalGallery";
import { fetchImageUrls } from "../../../common/images"; // Import the common function for fetching images

const Gallery = ({ layout = "horizontal", name, imagesFolderUrl, description, showCover = true }) => {
  const [images, setImages] = useState([]);
  const shuffledImagesRef = useRef(null); // Store the shuffled images to maintain consistency across renders

  // Function to shuffle the array of images
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    const fetchImages = async () => {
      const urls = await fetchImageUrls(imagesFolderUrl);
      // Shuffle the images only once and store them in a ref
      if (!shuffledImagesRef.current) {
        shuffledImagesRef.current = shuffleArray(urls);
      }
      setImages(shuffledImagesRef.current); // Set the shuffled images
    };

    fetchImages();
  }, [imagesFolderUrl]); // Fetch images when imagesFolderUrl changes

  return layout === "masonry" ? <MasonryGallery name={name} images={images} description={description} showCover={showCover} /> : <HorizontalGallery name={name} images={images} description={description} showCover={showCover} />;
};

export default Gallery;
