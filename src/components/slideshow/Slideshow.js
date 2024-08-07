import React, { useEffect, useState, useRef } from "react";
import { HiOutlinePause, HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi2";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { RxEnterFullScreen, RxExitFullScreen } from "react-icons/rx";
import { IoMusicalNotesOutline, IoPlaySharp, IoGridOutline } from "react-icons/io5";
import { PiGridFourLight, PiArrowLeftLight, PiArrowRightLight, PiGridFourThin } from "react-icons/pi";
import { useMediaQuery } from "react-responsive";

import useYouTubePlayer from "./useYouTubePlayer";
import "./Slideshow.css";

const Slideshow = ({ imageUrls, layout = "default", title = "Gallery Title", youtubeUrl, subtitle = "Subtitle", customDurations = {}, captions = {}, coverImageIndex = 0, mobileCoverImageIndex = 0, hideCaptionsOnMobile = true }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [tilts, setTilts] = useState([]);
  const [zTilts, setZTilts] = useState([]);
  const [aspectRatios, setAspectRatios] = useState([]);
  const [moveXs, setMoveXs] = useState([]);
  const [moveYs, setMoveYs] = useState([]);
  const [durations, setDurations] = useState([]);
  const [direction, setDirection] = useState("left");
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [slideshowPlaying, setSlideshowPlaying] = useState(false);
  const [showCover, setShowCover] = useState(true);
  const [viewMode, setViewMode] = useState("slideshow");
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const playerRef = useYouTubePlayer(youtubeUrl.split("v=")[1] || youtubeUrl.split("/").pop().split("?")[0]);
  const slideshowInterval = useRef(null);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  useEffect(() => {
    if (imageUrls.length > 0) {
      const newTilts = imageUrls.map(() => Math.random() * 12 - 6);
      const newZTilts = imageUrls.map(() => Math.random() * 20 - 10);
      const newMoveXs = imageUrls.map(() => `${Math.random() * 15 - 5}px`);
      const newMoveYs = imageUrls.map(() => `${Math.random() * 20 - 5}px`);
      const newDurations = imageUrls.map(() => `${Math.random() * 2 + 3}s`);

      setTilts(newTilts);
      setZTilts(newZTilts);
      setMoveXs(newMoveXs);
      setMoveYs(newMoveYs);
      setDurations(newDurations);

      Promise.all(
        imageUrls.map((url) => {
          return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
              resolve(img.width / img.height);
            };
            img.onerror = () => {
              resolve(1);
            };
            img.src = url;
          });
        })
      ).then((aspectRatios) => {
        setAspectRatios(aspectRatios);
        setImagesLoaded(true); // Ensure this is set after all images are loaded
      });
    }
  }, [imageUrls]);

  useEffect(() => {
    if (layout === "slideshow" && imagesLoaded && imageUrls.length > 0 && slideshowPlaying) {
      startSlideshow();
      return () => clearInterval(slideshowInterval.current);
    }
  }, [layout, imagesLoaded, imageUrls, slideshowPlaying]);

  useEffect(() => {
    if (slideshowPlaying) {
      startSlideshow();
      return () => clearInterval(slideshowInterval.current);
    }
  }, [slideshowPlaying]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        handlePreviousPhoto();
      } else if (event.key === "ArrowRight") {
        handleNextPhoto();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentImageIndex]);

  const startSlideshow = () => {
    clearInterval(slideshowInterval.current);
    const duration = customDurations[currentImageIndex] || 4000;
    slideshowInterval.current = setTimeout(() => {
      setTransitioning(true);
      setDirection(Math.random() > 0.5 ? "left" : "right");
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
        setTransitioning(false);
        if (slideshowPlaying) startSlideshow();
      }, 2000);
    }, duration - 2000);
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
    if (viewMode === "grid") {
      setViewMode("slideshow");
      setSlideshowPlaying(true);
      startSlideshow();
      if (playerRef.current && !audioPlaying) {
        playerRef.current.playVideo();
        setAudioPlaying(true);
      }
    } else {
      if (slideshowPlaying) {
        clearInterval(slideshowInterval.current);
        if (playerRef.current) playerRef.current.pauseVideo();
        setSlideshowPlaying(false);
        setAudioPlaying(false);
      } else {
        startSlideshow();
        if (playerRef.current && !audioPlaying) {
          playerRef.current.playVideo();
          setAudioPlaying(true);
        }
        setSlideshowPlaying(true);
      }
    }
  };

  const handleStartClick = () => {
    setShowCover(false);
    handlePlayPauseAudio();
    setSlideshowPlaying(true);
  };

  const handleToggleFullscreen = () => {
    if (!isFullscreen) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const handleGridView = () => {
    setViewMode("grid");
    clearInterval(slideshowInterval.current);
    setSlideshowPlaying(false);
  };

  const handlePreviousPhoto = () => {
    if (currentImageIndex > 0) {
      setTransitioning(true);
      setDirection("right");
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => prevIndex - 1);
        setTransitioning(false);
      }, 2000);
    }
  };

  const handleNextPhoto = () => {
    if (currentImageIndex < imageUrls.length - 1) {
      setTransitioning(true);
      setDirection("left");
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => prevIndex + 1);
        setTransitioning(false);
      }, 2000);
    }
  };

  const renderPhotos = () => {
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
      <div className="slideshow-container mt-8 md:mt-0">
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
            {(!isMobile || !hideCaptionsOnMobile) && captions[index] && (
              <div className="absolute top-10 left-4 w-3/5 p-5">
                <div
                  className="text-left bg-yellow-200 font-geist-mono shadow-lg transform rotate-1"
                  style={{
                    backgroundImage: "url('images/paper2.jpg')",
                    backgroundSize: "cover",
                    boxShadow: "2px 2px 8px rgba(0,0,0,0.2)",
                    clipPath: "url(#torn-edge-clip)",
                    padding: "20px",
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
    <div className={`flex ${viewMode === "grid" ? "min-h-screen" : "h-screen"} overflow-hidden`}>
      {showCover && (
        <div className="absolute inset-0 flex items-center justify-center bg-cover bg-center z-50 w-full h-full">
          <>
            <div className="absolute inset-0 w-full h-full bg-black z-10"></div>
            <img src={imageUrls[isMobile ? mobileCoverImageIndex : coverImageIndex]} alt="" className="absolute inset-0 w-full h-full object-cover z-20 fade-in" />
            <div className="overlay absolute inset-0 bg-black opacity-60 z-30"></div>
            <div className="text-center text-white p-4 z-40 fade-in">
              <h1 className="text-6xl mb-2 font-extrabold tracking-tight">{title}</h1>
              <p className="text-xl mb-4 text-gray-300">{subtitle}</p>
              <button onClick={handleStartClick} className="inline-block bg-white text-black text-2xl px-10 py-4 rounded-full opacity-60 hover:opacity-75 mt-7">
                Start the Show
              </button>
            </div>
          </>
        </div>
      )}

      <div className="hidden md:flex flex-col justify-between items-center w-16 border-r border-gray-300 text-gray-800 p-2 shadow-sm">
        <div className="flex flex-col items-center text-gray-700">
          <IoGridOutline className="hover:text-red-500 mt-4 cursor-pointer" size={18} onClick={handleGridView} style={{ opacity: viewMode === "grid" ? 0.3 : 1 }} />
          {isFullscreen ? (
            <RxExitFullScreen className="hover:text-red-500 mt-4 cursor-pointer" size={20} onClick={handleToggleFullscreen} style={{ opacity: 1 }} />
          ) : (
            <RxEnterFullScreen className="hover:text-red-500 mt-4 cursor-pointer" size={20} onClick={handleToggleFullscreen} style={{ opacity: 1 }} />
          )}
          {slideshowPlaying ? (
            <HiOutlinePause className="hover:text-red-500 mt-4 cursor-pointer" size={24} onClick={handlePlayPauseSlideshow} style={{ opacity: 1 }} />
          ) : (
            <AiOutlinePlayCircle className="hover:text-red-500 mt-4 cursor-pointer" size={24} onClick={handlePlayPauseSlideshow} style={{ opacity: 1 }} />
          )}
          {viewMode === "slideshow" && (
            <>
              <PiArrowLeftLight className={`hover:text-red-500 mt-4 cursor-pointer ${currentImageIndex === 0 ? "opacity-30" : "opacity-100"}`} size={24} onClick={handlePreviousPhoto} style={{ pointerEvents: currentImageIndex === 0 ? "none" : "auto" }} />
              <PiArrowRightLight className={`hover:text-red-500 mt-4 cursor-pointer ${currentImageIndex === imageUrls.length - 1 ? "opacity-30" : "opacity-100"}`} size={24} onClick={handleNextPhoto} style={{ pointerEvents: currentImageIndex === imageUrls.length - 1 ? "none" : "auto" }} />
            </>
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

      {/* Mobile Top Bar */}
      {!showCover && isMobile && (
        <div className="fixed top-0 left-0 right-0 flex flex-col items-center bg-gray-200 text-gray-900 border-b border-gray-300 p-3 z-50">
          <h1 className="text-xl font-bold">{title}</h1>
          <div className="text-xs">Photos by Swami Venkataramani</div>
        </div>
      )}

      {/* Mobile Floating Buttons */}
      {!showCover && isMobile && (
        <div className="fixed-bottom">
          <button className={`${currentImageIndex === 0 ? "opacity-30" : "opacity-100"}`} onClick={handlePreviousPhoto} style={{ pointerEvents: currentImageIndex === 0 ? "none" : "auto" }}>
            <PiArrowLeftLight size={24} />
          </button>
          <button onClick={handlePlayPauseSlideshow}>{slideshowPlaying ? <HiOutlinePause size={24} /> : <IoPlaySharp size={24} />}</button>
          <button className={`${currentImageIndex === imageUrls.length - 1 ? "opacity-30" : "opacity-100"}`} onClick={handleNextPhoto} style={{ pointerEvents: currentImageIndex === imageUrls.length - 1 ? "none" : "auto" }}>
            <PiArrowRightLight size={24} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Slideshow;
