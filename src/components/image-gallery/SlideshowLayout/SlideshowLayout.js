import React, { useEffect, useState, useRef } from "react";
import "./SlideshowLayout.css";

const SlideshowLayout = ({ imageUrls, customDurations, captions, onLoadMore, slideshowPreloadThreshold }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [tilts, setTilts] = useState([]);
  const [zTilts, setZTilts] = useState([]);
  const [aspectRatios, setAspectRatios] = useState([]);
  const [moveXs, setMoveXs] = useState([]);
  const [moveYs, setMoveYs] = useState([]);
  const [durations, setDurations] = useState([]);
  const slideshowInterval = useRef(null);

  useEffect(() => {
    if (imageUrls.length > 0) {
      setTilts(imageUrls.map(() => Math.random() * 12 - 6)); // Precompute tilts for each image
      setZTilts(imageUrls.map(() => Math.random() * 20 - 10)); // Precompute z-tilts for each image
      setMoveXs(imageUrls.map(() => `${Math.random() * 15 - 5}px`)); // Precompute x-axis movements for each image
      setMoveYs(imageUrls.map(() => `${Math.random() * 20 - 5}px`)); // Precompute y-axis movements for each image
      setDurations(imageUrls.map(() => `${Math.random() * 2 + 3}s`)); // Precompute durations for each image

      // Fetch image dimensions to determine aspect ratios
      Promise.all(
        imageUrls.map((url) => {
          return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
              resolve(img.width / img.height);
            };
            img.onerror = () => {
              resolve(1); // Default aspect ratio if image fails to load
            };
            img.src = url;
          });
        })
      ).then((aspectRatios) => {
        setAspectRatios(aspectRatios);
      });
    }
  }, [imageUrls]);

  useEffect(() => {
    startSlideshow();
    return () => clearInterval(slideshowInterval.current);
  }, [currentImageIndex]);

  useEffect(() => {
    if (imageUrls.length - currentImageIndex <= slideshowPreloadThreshold) {
      onLoadMore();
    }
  }, [currentImageIndex, imageUrls.length, slideshowPreloadThreshold, onLoadMore]);

  const startSlideshow = () => {
    clearInterval(slideshowInterval.current);
    const duration = customDurations[currentImageIndex] || 4000; // Use custom duration if available, otherwise default to 4 seconds
    slideshowInterval.current = setTimeout(() => {
      setTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
        setTransitioning(false);
        startSlideshow(); // Restart the slideshow with the new image's duration
      }, 2000); // Animation duration
    }, duration - 2000); // Display duration minus animation duration
  };

  return (
    <div className="slideshow-container">
      {imageUrls.map((url, index) => (
        <div
          key={index}
          className={`slideshow-image ${aspectRatios[index] > 1 ? "horizontal" : "vertical"} ${index === currentImageIndex ? (transitioning ? "slide-out" : "visible") : "hidden"}`}
          style={{
            "--rotate": `${tilts[index]}deg`,
            "--rotateZ": `${zTilts[index]}deg`,
            "--moveX": moveXs[index],
            "--moveY": moveYs[index],
            "--duration": durations[index],
            zIndex: imageUrls.length - index,
          }}>
          <img src={url} alt={`Image ${index + 1}`} />
          {captions[index] && (
            <div className="absolute top-10 left-4 w-3/5 p-5">
              <div
                className="text-left bg-yellow-200 font-geist-mono shadow-lg transform rotate-1"
                style={{
                  backgroundImage: "url('images/paper2.jpg')",
                  backgroundSize: "cover",
                  boxShadow: "2px 2px 8px rgba(0,0,0,0.2)",
                  clipPath: "url(#torn-edge-clip)",
                  padding: "20px", // Increased padding
                }}>
                {captions[index]}
              </div>
              <svg width="0" height="0">
                <clipPath id="torn-edge-clip" clipPathUnits="objectBoundingBox">
                  <path d="M0,0 h1 v0.7 l-0.1,0.05 l0.05,0.05 l-0.05,0.05 l0.1,0.05 v0.7 h-1 z" />
                </clipPath>
              </svg>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SlideshowLayout;
