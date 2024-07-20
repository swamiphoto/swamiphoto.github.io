import React, { useEffect, useState, useRef } from "react";
import { HiOutlinePause } from "react-icons/hi2";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { RxEnterFullScreen, RxExitFullScreen } from "react-icons/rx";
import { IoMusicalNotesOutline } from "react-icons/io5";
import { PiGridNineLight } from "react-icons/pi";

import useYouTubePlayer from "./useYouTubePlayer";
import "./ImageGallery.css";

const ImageGallery = ({ imageUrls, layout = "default", title = "Gallery Title", youtubeUrl, subtitle = "Subtitle", customDurations = {}, captions = {} }) => {
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
  const [viewMode, setViewMode] = useState("slideshow"); // Added state for view mode
  const playerRef = useYouTubePlayer(youtubeUrl.split("v=")[1] || youtubeUrl.split("/").pop().split("?")[0]);
  const slideshowInterval = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
        setImagesLoaded(true);
      });
    }
  }, [imageUrls]);

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
      if (playerRef.current && !audioPlaying) {
        playerRef.current.playVideo();
        setAudioPlaying(true);
      }
    }
    handlePlayPauseAudio();
    setSlideshowPlaying(!slideshowPlaying);
    setViewMode("slideshow"); // Switch to slideshow mode
  };

  const handleStartClick = () => {
    setShowCover(false);
    handlePlayPauseAudio();
    setSlideshowPlaying(true); // Start slideshow when the start button is clicked
  };

  const handleToggleFullscreen = () => {
    if (!isFullscreen) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        // Firefox
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        // Chrome, Safari and Opera
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        // IE/Edge
        document.documentElement.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        // Firefox
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        // Chrome, Safari and Opera
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        // IE/Edge
        document.msExitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const handleGridView = () => {
    setViewMode("grid"); // Switch to grid view
    clearInterval(slideshowInterval.current); // Stop slideshow if it is running
    setSlideshowPlaying(false); // Ensure slideshow state is off
  };

  const renderPhotos = () => {
    if (!imagesLoaded) {
      return <div>Loading...</div>; // Display a loading message or spinner
    }

    if (viewMode === "grid") {
      return (
        <div className="grid-container">
          {imageUrls.map((url, index) => (
            <div key={index} className={`grid-item ${aspectRatios[index] >= 1 ? "horizontal" : "vertical"} shadow-lg`}>
              <img src={url} alt={`Image ${index + 1}`} className="object-cover" />
            </div>
          ))}
        </div>
      );
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
          {!imagesLoaded ? (
            <div className="flex items-center justify-center w-full h-full bg-black text-gray-300 text-2xl font-geist-mono">Preparing your show...please turn your sound on!</div>
          ) : (
            <>
              <div className="absolute inset-0 w-full h-full bg-black z-10"></div> {/* Fullscreen black layer */}
              <img src={imageUrls[4]} alt="" className="absolute inset-0 w-full h-full object-cover z-20 fade-in" />
              <div className="overlay absolute inset-0 bg-black opacity-60 z-30"></div>
              <div className="text-center text-white p-4 z-40 fade-in">
                <h1 className="text-6xl mb-2 font-extrabold tracking-tight">{title}</h1>
                <p className="text-xl mb-4 text-gray-300">{subtitle}</p>
                <button onClick={handleStartClick} className="hidden md:inline-block bg-white text-black text-2xl px-10 py-4 rounded-full opacity-60 hover:opacity-75 mt-7">
                  Start the Show
                </button>
              </div>
            </>
          )}
        </div>
      )}

      <div className="hidden md:flex flex-col justify-between items-center w-16 border-r border-gray-300 text-gray-800 p-2 shadow-sm">
        <div className="flex flex-col items-center text-gray-700 ">
          {slideshowPlaying ? (
            <HiOutlinePause className="hover:text-red-500 mt-4 cursor-pointer" size={24} onClick={handlePlayPauseSlideshow} style={{ opacity: 1 }} />
          ) : (
            <AiOutlinePlayCircle className="hover:text-red-500 mt-4 cursor-pointer" size={24} onClick={handlePlayPauseSlideshow} style={{ opacity: 1 }} />
          )}
          <IoMusicalNotesOutline className="hover:text-red-500 mt-4 cursor-pointer" size={20} onClick={handlePlayPauseAudio} style={{ opacity: audioPlaying ? 1 : 0.3 }} />
          <PiGridNineLight className="hover:text-red-500 mt-4 cursor-pointer" size={20} onClick={handleGridView} style={{ opacity: viewMode === "grid" ? 0.3 : 1 }} /> {/* Grid view icon */}
          {isFullscreen ? (
            <RxExitFullScreen className="hover:text-red-500 mt-4 cursor-pointer" size={20} onClick={handleToggleFullscreen} style={{ opacity: 1 }} />
          ) : (
            <RxEnterFullScreen className="hover:text-red-500 mt-4 cursor-pointer" size={20} onClick={handleToggleFullscreen} style={{ opacity: 1 }} />
          )}
        </div>
        <div className="flex flex-col mt-auto mb-4 items-start">
          <div className="vertical-text mb-2">
            <div className="text-gray-900 font-semibold text-lg text-left">{title}</div>
            <div className="uppercase text-xs text-left text-gray-500">
              Photos by{" "}
              <a href="https://swamiphoto.com" className="hover:text-red-500 transition-colors duration-300">
                Swami Venkataramani
              </a>
            </div>
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
