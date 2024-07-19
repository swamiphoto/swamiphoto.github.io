import React, { useEffect, useState, useRef } from "react";
import { FaHome, FaPlay, FaPause } from "react-icons/fa"; // Example icons
import { SlMusicToneAlt } from "react-icons/sl"; // Music icon
import { HiOutlinePause } from "react-icons/hi2";
import { VscPlay } from "react-icons/vsc";
import useYouTubePlayer from "./useYouTubePlayer"; // Import the custom hook
import "./ImageGallery.css"; // Ensure you have the CSS imported for animations

const bucketUrl = "https://storage.googleapis.com/swamiphoto"; // Base URL for your bucket
const apiKey = "AIzaSyB0Avp_4ydF9e0NFwE3qg8lbX2H0tQhCvs"; // Your Google Cloud API key

const ImageGallery = ({ folder, layout = "default", title = "Gallery Title", youtubeUrl, subtitle = "Subtitle" }) => {
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
  const [slideshowPlaying, setSlideshowPlaying] = useState(false); // Initially set to false
  const [showCover, setShowCover] = useState(true);
  const playerRef = useYouTubePlayer(youtubeUrl.split("v=")[1] || youtubeUrl.split("/").pop().split("?")[0]);
  const slideshowInterval = useRef(null);

  // Define custom durations for specific image indices (in milliseconds)
  const customDurations = {
    // 1: 60000,
  };

  const captions = {
    // 1: "Happy Birthday, Naga! Moving to Pleasanton has been incredible, and our friendship has been the true highlight. I admire the way you crush your fitness goals, chase your dreams, and live life with a playful spirit. Have an amazing year! I hope we get to celebrate your 43rd birthday in the Warm Heart of Africa :) Swami",
  };

  if (imageUrls.length > 0) {
    customDurations[imageUrls.length - 1] = 60000;
    captions[imageUrls.length - 1] =
      "Happy Birthday, Naga! Moving to Pleasanton has been incredible, and our friendship has been a big highlight. I admire how you crush your fitness goals, chase your dreams, and live life with a playful spirit. Have an amazing year! I hope we get to celebrate your 43rd birthday in the Warm Heart of Africa ;) Swami";
  }

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
    if (layout === "slideshow" && imagesLoaded && imageUrls.length > 0 && slideshowPlaying) {
      // Start the slideshow with the current image's custom duration
      startSlideshow();
      return () => clearInterval(slideshowInterval.current);
    }
  }, [layout, imagesLoaded, imageUrls, slideshowPlaying]);

  useEffect(() => {
    if (slideshowPlaying) {
      startSlideshow(); // Start the slideshow initially
      return () => clearInterval(slideshowInterval.current); // Clean up the interval on unmount or when slideshowPlaying changes
    }
  }, [slideshowPlaying]);

  useEffect(() => {
    if (slideshowPlaying) {
      startSlideshow(); // Restart the slideshow with the correct duration when the current image index changes
    }
  }, [currentImageIndex]);

  const startSlideshow = () => {
    clearInterval(slideshowInterval.current);
    const duration = customDurations[currentImageIndex] || 4000; // Use custom duration if available, otherwise default to 4 seconds
    slideshowInterval.current = setTimeout(() => {
      setTransitioning(true);
      setDirection(Math.random() > 0.5 ? "left" : "right");
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
        setTransitioning(false);
        startSlideshow(); // Restart the slideshow with the new image's duration
      }, 2000); // Animation duration
    }, duration - 2000); // Display duration minus animation duration
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

  const handleStartClick = () => {
    setShowCover(false);
    handlePlayPauseAudio();
    setSlideshowPlaying(true); // Start slideshow when the start button is clicked
  };

  const renderPhotos = () => {
    if (!imagesLoaded) {
      return <div>Loading...</div>; // Display a loading message or spinner
    }

    return (
      <div className="slideshow-container">
        {imageUrls.map((url, index) => (
          <div
            key={index}
            className={`slideshow-image ${aspectRatios[index] > 1 ? "horizontal" : "vertical"} ${index === currentImageIndex ? (transitioning ? `slide-out-${direction}` : "visible") : index > currentImageIndex ? "stacked" : "hidden"}`}
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

  return (
    <div className="flex h-screen">
      {showCover && (
        <div className="absolute inset-0 flex items-center justify-center bg-cover bg-center z-50 w-full h-full">
          <img src={imageUrls[5]} alt="" className="absolute inset-0 w-full h-full object-cover z-0" />
          <div className="overlay absolute inset-0 bg-black opacity-60 z-10"></div>
          <div className="text-center text-white p-4 z-20">
            <h1 className="text-6xl mb-2 font-extrabold tracking-tight">{title}</h1>
            <p className="text-xl mb-4">{subtitle}</p>
            <button onClick={handleStartClick} className="hidden md:inline-block bg-white text-black text-xl px-10 py-4 rounded-full opacity-70 hover:opacity-75 font-geist-mono mt-7">
              Start Slideshow
            </button>

            <div className="block md:hidden fixed inset-0 flex items-center justify-center bg-gray-800 text-gray-300 text-lg font-geist-mono p-4">
              <p className="text-center">This gallery is not available on mobile yet. Please view on a computer.</p>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col justify-between items-center w-16 border-r border-gray-300 text-gray-800 p-2 shadow-sm">
        <div className="flex flex-col items-center">
          {slideshowPlaying ? <HiOutlinePause className="mt-4 cursor-pointer" size={24} onClick={handlePlayPauseSlideshow} style={{ opacity: 1 }} /> : <VscPlay className="mt-4 cursor-pointer" size={24} onClick={handlePlayPauseSlideshow} style={{ opacity: 1 }} />}
          <SlMusicToneAlt className="mt-4 cursor-pointer" size={20} onClick={handlePlayPauseAudio} style={{ opacity: audioPlaying ? 1 : 0.3 }} />
        </div>
        <div className="flex flex-col mt-auto mb-4 items-start">
          <div className="vertical-text mb-2">
            <div className="text-gray-900 font-semibold text-lg text-left">{title}</div>
            <div className="uppercase text-xs text-left">Photos by Swami Venkataramani</div>
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
