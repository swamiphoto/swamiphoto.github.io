import React, { useEffect, useState } from "react";
import Photo from "../../components/photo/Photo"; // Photo import included
import { useDarkenOnScroll } from "../../hooks/useDarkenOnScroll";
import "./ImageGallery.css"; // Ensure you have the CSS imported

const bucketUrl = "https://storage.googleapis.com/swamiphoto"; // Base URL for your bucket
const apiKey = "AIzaSyB0Avp_4ydF9e0NFwE3qg8lbX2H0tQhCvs"; // Your Google Cloud API key

const ImageGallery = ({ folder, layout = "default" }) => {
  const [imageUrls, setImageUrls] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [tilts, setTilts] = useState([]);
  const [direction, setDirection] = useState("left");
  useDarkenOnScroll();

  const fetchImageUrls = async (folder) => {
    const response = await fetch(`https://storage.googleapis.com/storage/v1/b/swamiphoto/o?prefix=photos/${folder}/&key=${apiKey}`);
    const data = await response.json();
    const urls = data.items.map((item) => `${bucketUrl}/${item.name}`);
    return urls;
  };

  useEffect(() => {
    const fetchImages = async () => {
      const urls = await fetchImageUrls(folder);
      setImageUrls(urls);
      setTilts(urls.map(() => Math.random() * 6 - 3)); // Precompute tilts for each image
    };

    fetchImages();
  }, [folder]);

  useEffect(() => {
    if (layout === "slideshow" && imageUrls.length > 0) {
      const interval = setInterval(() => {
        setTransitioning(true);
        setDirection(Math.random() > 0.5 ? "left" : "right");
        setTimeout(() => {
          setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
          setTransitioning(false);
        }, 1000); // Animation duration
      }, 5000); // Display duration
      return () => clearInterval(interval);
    }
  }, [layout, imageUrls]);

  const renderPhotos = () => {
    switch (layout) {
      case "slideshow":
        return (
          <div className="slideshow-container">
            {imageUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Image ${index + 1}`}
                className={`slideshow-image ${index === currentImageIndex ? (transitioning ? `slide-out-${direction}` : "visible") : index > currentImageIndex ? "stacked" : "hidden"}`}
                style={{ "--rotate": `${tilts[index]}deg`, zIndex: imageUrls.length - index }}
              />
            ))}
          </div>
        );
      case "masonry":
        return (
          <div className="masonry-layout">
            {imageUrls.map((url, index) => (
              <Photo key={index} src={url} alt={`Image ${index + 1}`} />
            ))}
          </div>
        );
      case "grid":
        return (
          <div className="grid-layout">
            {imageUrls.map((url, index) => (
              <Photo key={index} src={url} alt={`Image ${index + 1}`} />
            ))}
          </div>
        );
      default:
        return (
          <div className="default-layout">
            {imageUrls.map((url, index) => (
              <Photo key={index} src={url} alt={`Image ${index + 1}`} />
            ))}
          </div>
        );
    }
  };

  return <main className="max-w-7xl mx-auto">{renderPhotos()}</main>;
};

export default ImageGallery;
