import React, { useEffect, useState, useRef } from "react";
import { FaHome, FaPlay, FaPause } from "react-icons/fa"; // Example icons
import { SlMusicToneAlt } from "react-icons/sl"; // Music icon
import { FiPlay, FiPause } from "react-icons/fi";
import { HiOutlinePause } from "react-icons/hi2";
import { VscPlay } from "react-icons/vsc";
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
  const [slideshowPlaying, setSlideshowPlaying] = useState(true);
  const playerRef = useYouTubePlayer(youtubeUrl.split("v=")[1] || youtubeUrl.split("/").pop().split("?")[0]);
  const slideshowInterval = useRef(null);

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
      startSlideshow();
      return () => clearInterval(slideshowInterval.current);
    }
  }, [layout, imagesLoaded, imageUrls]);

  const startSlideshow = () => {
    clearInterval(slideshowInterval.current);
    slideshowInterval.current = setInterval(() => {
      setTransitioning(true);
      setDirection(Math.random() > 0.5 ? "left" : "right");
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
        setTransitioning(false);
      }, 2000); // Animation duration
    }, 4000); // Display duration
  };

  const handlePlayPauseAudio = () => {
    if (playerRef.current) {
      if (audioPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
      setAudioPlaying(!audioPlaying);
    }
  };

  const handlePlayPauseSlideshow = () => {
    if (slideshowPlaying) {
      clearInterval(slideshowInterval.current);
    } else {
      startSlideshow();
    }
    setSlideshowPlaying(!slideshowPlaying);
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
      <div className="flex flex-col justify-between items-center w-16 border-r border-gray-100 font-geist-mono text-gray-800 p-2 shadow-sm">
        <div className="flex flex-col items-center">
          {slideshowPlaying ? <HiOutlinePause className="mt-4 cursor-pointer" size={24} onClick={handlePlayPauseSlideshow} style={{ opacity: 1 }} /> : <VscPlay className="mt-4 cursor-pointer" size={24} onClick={handlePlayPauseSlideshow} style={{ opacity: 1 }} />}
          <SlMusicToneAlt className="mt-4 cursor-pointer" size={20} onClick={handlePlayPauseAudio} style={{ opacity: audioPlaying ? 1 : 0.3 }} />
        </div>
        <div className="flex flex-col items-center mt-auto mb-4">
          <div className="vertical-text mb-2">
            <div className=" text-gray-500">{title}</div>
          </div>
          <div className="vertical-text mb-2">
            <div className=" text-gray-500"> / </div>
          </div>
          <div className="vertical-text">
            <div className="uppercase">Swamiphoto</div>
          </div>
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
