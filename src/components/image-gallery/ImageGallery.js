import React, { useEffect, useState } from "react";
import { FaHome, FaMusic } from "react-icons/fa"; // Example icons
import useYouTubePlayer from "./useYouTubePlayer"; // Import the custom hook
import "./ImageGallery.css"; // Ensure you have the CSS imported for animations

const bucketUrl = "https://storage.googleapis.com/swamiphoto"; // Base URL for your bucket
const apiKey = "AIzaSyB0Avp_4ydF9e0NFwE3qg8lbX2H0tQhCvs"; // Your Google Cloud API key

const ImageGallery = ({ folder, layout = "default", title = "Gallery Title", youtubeUrl }) => {
  const [imageUrls, setImageUrls] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [tilts, setTilts] = useState([]);
  const [zTilts, setZTilts] = useState([]);
  const [aspectRatios, setAspectRatios] = useState([]);
  const [moveXs, setMoveXs] = useState([]);
  const [moveYs, setMoveYs] = useState([]);
  const [durations, setDurations] = useState([]);
  const [direction, setDirection] = useState("left");
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const playerRef = useYouTubePlayer(youtubeUrl.split("v=")[1] || youtubeUrl.split("/").pop().split("?")[0]);

  const fetchImageUrls = async (folder) => {
    try {
      const response = await fetch(`https://storage.googleapis.com/storage/v1/b/swamiphoto/o?prefix=photos/${folder}/&key=${apiKey}`);
      const data = await response.json();
      const urls = data.items
        .filter((item) => item.name.match(/\.(jpg|jpeg|png|gif)$/i)) // Filter out non-image URLs
        .map((item) => `${bucketUrl}/${item.name}`);
      return urls;
    } catch (error) {
      console.error("Error fetching image URLs:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchImages = async () => {
      const urls = await fetchImageUrls(folder);
      setImageUrls(urls);
      setTilts(urls.map(() => Math.random() * 12 - 6)); // Precompute tilts for each image
      setZTilts(urls.map(() => Math.random() * 20 - 10)); // Precompute z-tilts for each image
      setMoveXs(urls.map(() => `${Math.random() * 15 - 5}px`)); // Precompute x-axis movements for each image
      setMoveYs(urls.map(() => `${Math.random() * 20 - 5}px`)); // Precompute y-axis movements for each image
      setDurations(urls.map(() => `${Math.random() * 2 + 3}s`)); // Precompute durations for each image

      // Fetch image dimensions to determine aspect ratios
      const aspectRatios = await Promise.all(
        urls.map((url) => {
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
      );
      setAspectRatios(aspectRatios);
      setImagesLoaded(true);
    };

    fetchImages();
  }, [folder]);

  useEffect(() => {
    if (layout === "slideshow" && imagesLoaded && imageUrls.length > 0) {
      const interval = setInterval(() => {
        setTransitioning(true);
        setDirection(Math.random() > 0.5 ? "left" : "right");
        setTimeout(() => {
          setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
          setTransitioning(false);
        }, 2000); // Animation duration
      }, 4000); // Display duration
      return () => clearInterval(interval);
    }
  }, [layout, imagesLoaded, imageUrls]);

  const handlePlayPause = () => {
    if (playerRef.current) {
      if (audioPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
      setAudioPlaying(!audioPlaying);
    }
  };

  const renderPhotos = () => {
    if (!imagesLoaded) {
      return <div>Loading...</div>; // Display a loading message or spinner
    }

    return (
      <div className="slideshow-container">
        {imageUrls.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Image ${index + 1}`}
            className={`slideshow-image ${aspectRatios[index] > 1 ? "horizontal" : "vertical"} ${index === currentImageIndex ? (transitioning ? `slide-out-${direction}` : "visible") : index > currentImageIndex ? "stacked" : "hidden"}`}
            style={{
              "--rotate": `${tilts[index]}deg`,
              "--rotateZ": `${zTilts[index]}deg`,
              "--moveX": moveXs[index],
              "--moveY": moveYs[index],
              "--duration": durations[index],
              zIndex: imageUrls.length - index,
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex h-screen">
      <div className="flex flex-col justify-between items-center w-16 bg-gray-300 font-geist-mono text-gray-800 p-2 shadow-lg">
        <div className="flex flex-col items-center">
          <FaHome className="mb-4 cursor-pointer" size={24} />
          <FaMusic className="mb-4 cursor-pointer" size={24} onClick={handlePlayPause} style={{ opacity: audioPlaying ? 1 : 0.3 }} />
          {/* Add more icons as needed */}
        </div>
        <div className="vertical-text mb-4">
          <div className="text-lg">{title}</div>
        </div>
      </div>
      <main className="flex-grow flex justify-center items-center relative">
        {renderPhotos()}
        {youtubeUrl && <div id="youtube-player" className="absolute top-0 left-0 w-full h-full opacity-0 pointer-events-none"></div>}
      </main>
    </div>
  );
};

export default ImageGallery;
