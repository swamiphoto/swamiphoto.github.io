import React, { useEffect, useState, useRef } from "react";
import { HiOutlinePause, HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi2";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { RxEnterFullScreen, RxExitFullScreen } from "react-icons/rx";
import { useMediaQuery } from "react-responsive";

import useYouTubePlayer from "./useYouTubePlayer";
import FilmStackSlideshowLayout from "./film-stack-slideshow-layout/FilmStackSlideshowLayout";
import FilmSingleSlideshowLayout from "./film-single-slideshow-layout/FilmSingleSlideshowLayout";
import KenBurnsSlideshowLayout from "./kenburns-slideshow-layout/KenBurnsSlideshowLayout";
import "./Slideshow.css";

const Slideshow = ({ imageUrls, title = "Gallery Title", youtubeUrl, subtitle = "Subtitle", customDurations = {}, captions = {}, coverImageIndex = 0, mobileCoverImageIndex = 0, hideCaptionsOnMobile = true, layout = "film-stack" }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [aspectRatios, setAspectRatios] = useState([]);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [slideshowPlaying, setSlideshowPlaying] = useState(false);
  const [showCover, setShowCover] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const playerRef = useYouTubePlayer(youtubeUrl.split("v=")[1] || youtubeUrl.split("/").pop().split("?")[0]);
  const slideshowInterval = useRef(null);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  useEffect(() => {
    if (imageUrls.length > 0) {
      const calculateAspectRatios = async () => {
        const ratios = await Promise.all(
          imageUrls.map((url) => {
            return new Promise((resolve) => {
              const img = new Image();
              img.onload = () => {
                const aspectRatio = img.width / img.height;
                console.log(`Loaded image ${url} with aspect ratio: ${aspectRatio}`);
                resolve(aspectRatio);
              };
              img.onerror = () => {
                console.error(`Failed to load image ${url}`);
                resolve(1); // default to 1 if there's an error
              };
              img.src = url;
            });
          })
        );
        setAspectRatios(ratios);
        setImagesLoaded(true);
      };

      calculateAspectRatios();
    }
  }, [imageUrls]);

  useEffect(() => {
    if (imagesLoaded && imageUrls.length > 0 && slideshowPlaying) {
      startSlideshow();
      return () => clearInterval(slideshowInterval.current);
    }
  }, [imagesLoaded, imageUrls, slideshowPlaying]);

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
    const duration = customDurations[currentImageIndex] || 10000; // Increase this if you want the crossfade to start earlier
    slideshowInterval.current = setTimeout(() => {
      setTransitioning(true);
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
      setTransitioning(false);
      if (slideshowPlaying) startSlideshow();
    }, duration - 2000); // Adjust this timing as needed for your desired effect
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

  const handlePreviousPhoto = () => {
    if (currentImageIndex > 0) {
      setTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => prevIndex - 1);
        setTransitioning(false);
      }, 2000);
    }
  };

  const handleNextPhoto = () => {
    if (currentImageIndex < imageUrls.length - 1) {
      setTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => prevIndex + 1);
        setTransitioning(false);
      }, 2000);
    }
  };

  const renderPhotos = () => {
    switch (layout) {
      case "film-stack":
        return <FilmStackSlideshowLayout imageUrls={imageUrls} currentImageIndex={currentImageIndex} transitioning={transitioning} aspectRatios={aspectRatios} captions={captions} hideCaptionsOnMobile={hideCaptionsOnMobile} />;
      case "film-single":
        return <FilmSingleSlideshowLayout imageUrls={imageUrls} currentImageIndex={currentImageIndex} transitioning={transitioning} aspectRatios={aspectRatios} captions={captions} hideCaptionsOnMobile={hideCaptionsOnMobile} />;
      case "kenburns":
        return <KenBurnsSlideshowLayout imageUrls={imageUrls} currentImageIndex={currentImageIndex} transitioning={transitioning} aspectRatios={aspectRatios} captions={captions} hideCaptionsOnMobile={hideCaptionsOnMobile} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
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

      <main className="flex-grow flex justify-center items-center relative">
        {renderPhotos()}
        {youtubeUrl && <div id="youtube-player" className="absolute top-0 left-0 w-full h-full opacity-0 pointer-events-none"></div>}
      </main>

      {!showCover && !isMobile && (
        <div className="fixed bottom-4 left-4 flex space-x-4 bg-white bg-opacity-90 p-3 shadow-lg rounded-lg z-50">
          {isFullscreen ? <RxExitFullScreen className="hover:text-red-500 cursor-pointer" size={20} onClick={handleToggleFullscreen} /> : <RxEnterFullScreen className="hover:text-red-500 cursor-pointer" size={20} onClick={handleToggleFullscreen} />}
          {slideshowPlaying ? <HiOutlinePause className="hover:text-red-500 cursor-pointer" size={24} onClick={handlePlayPauseSlideshow} /> : <AiOutlinePlayCircle className="hover:text-red-500 cursor-pointer" size={24} onClick={handlePlayPauseSlideshow} />}
          <HiOutlineArrowLeft className={`hover:text-red-500 cursor-pointer ${currentImageIndex === 0 ? "opacity-30" : "opacity-100"}`} size={24} onClick={handlePreviousPhoto} style={{ pointerEvents: currentImageIndex === 0 ? "none" : "auto" }} />
          <HiOutlineArrowRight className={`hover:text-red-500 cursor-pointer ${currentImageIndex === imageUrls.length - 1 ? "opacity-30" : "opacity-100"}`} size={24} onClick={handleNextPhoto} style={{ pointerEvents: currentImageIndex === imageUrls.length - 1 ? "none" : "auto" }} />
        </div>
      )}

      {!showCover && isMobile && (
        <div className="fixed-bottom">
          <button className={`${currentImageIndex === 0 ? "opacity-30" : "opacity-100"}`} onClick={handlePreviousPhoto} style={{ pointerEvents: currentImageIndex === 0 ? "none" : "auto" }}>
            <HiOutlineArrowLeft size={24} />
          </button>
          <button onClick={handlePlayPauseSlideshow}>{slideshowPlaying ? <HiOutlinePause size={24} /> : <AiOutlinePlayCircle size={24} />}</button>
          <button className={`${currentImageIndex === imageUrls.length - 1 ? "opacity-30" : "opacity-100"}`} onClick={handleNextPhoto} style={{ pointerEvents: currentImageIndex === imageUrls.length - 1 ? "none" : "auto" }}>
            <HiOutlineArrowRight size={24} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Slideshow;
