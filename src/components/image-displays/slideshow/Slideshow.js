import React, { useEffect, useState, useRef } from "react";
import { HiOutlinePause, HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi2";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { RxEnterFullScreen, RxExitFullScreen } from "react-icons/rx";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";

import useYouTubePlayer from "./useYouTubePlayer";
import FilmStackSlideshowLayout from "./film-stack-slideshow-layout/FilmStackSlideshowLayout";
import FilmSingleSlideshowLayout from "./film-single-slideshow-layout/FilmSingleSlideshowLayout";
import KenBurnsSlideshowLayout from "./kenburns-slideshow-layout/KenBurnsSlideshowLayout";
import "./Slideshow.css";

const Slideshow = ({ imageUrls, title = "Gallery Title", youtubeUrl, subtitle = "Subtitle", customDurations = {}, captions = {}, coverImageIndex = 0, mobileCoverImageIndex = 0, hideCaptionsOnMobile = true, layout = "film-stack", slug }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [aspectRatios, setAspectRatios] = useState([]);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [slideshowPlaying, setSlideshowPlaying] = useState(true); // Start the slideshow immediately
  // const [showCover, setShowCover] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const playerRef = useYouTubePlayer(youtubeUrl.split("v=")[1] || youtubeUrl.split("/").pop().split("?")[0]);
  const slideshowInterval = useRef(null);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const navigate = useNavigate();

  useEffect(() => {
    if (imageUrls.length > 0) {
      const calculateAspectRatios = async () => {
        const ratios = await Promise.all(
          imageUrls.map((url) => {
            return new Promise((resolve) => {
              const img = new Image();
              img.onload = () => {
                const aspectRatio = img.width / img.height;
                resolve(aspectRatio);
              };
              img.onerror = () => {
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
    const duration = customDurations[currentImageIndex] || 10000;
    slideshowInterval.current = setTimeout(() => {
      setTransitioning(true);
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
      setTransitioning(false);
      if (slideshowPlaying) startSlideshow();
    }, duration - 2000);
  };

  // const handlePlayPauseAudio = () => {
  //   if (playerRef.current) {
  //     if (audioPlaying) {
  //       playerRef.current.pauseVideo();
  //     } else {
  //       playerRef.current.playVideo();
  //     }
  //     setAudioPlaying(!audioPlaying);
  //   }
  // };

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
  // const handleStartClick = () => {
  //   setShowCover(false);
  //   handlePlayPauseAudio();
  //   setSlideshowPlaying(true);
  // };

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
      {/* Commented out the cover for now */}
      {/* {showCover && (
        <div className="absolute inset-0 flex items-center justify-center bg-cover bg-center z-50 w-full h-full">
          <>
            <div className="absolute inset-0 w-full h-full bg-black z-10"></div>
            <img src={imageUrls[isMobile ? mobileCoverImageIndex : coverImageIndex]} alt="" className="absolute inset-0 w-full h-full object-cover z-20 fade-in" />
            <div className="overlay absolute inset-0 bg-black opacity-70 z-30"></div>
            <div className="text-center text-gray-200 p-4 z-40 fade-in">
              <h1 className="text-4xl font-bold mb-2">{title}</h1>
              <p className="text-lg mb-6">{subtitle}</p>
              <button onClick={handleStartClick} className="inline-block text-gray-900 bg-white px-10 py-3 mt-7 hover:bg-gray-400 transition-colors duration-1000 uppercase font-geist-mono tracking-wider">
                Start the Show
              </button>
            </div>
          </>
        </div>
      )} */}

      <main className="flex-grow flex justify-center items-center relative">
        {renderPhotos()}
        {youtubeUrl && <div id="youtube-player" className="absolute top-0 left-0 w-full h-full opacity-0 pointer-events-none"></div>}
      </main>

      {!isMobile && (
        <div className="fixed top-4 left-4 flex space-x-4 bg-white bg-opacity-40 p-3 shadow-md rounded-lg z-50">
          <HiOutlineArrowLeft className="hover:text-red-500 cursor-pointer" size={24} onClick={() => navigate("/galleries")} />
          {slideshowPlaying ? <HiOutlinePause className="hover:text-red-500 cursor-pointer" size={24} onClick={handlePlayPauseSlideshow} /> : <AiOutlinePlayCircle className="hover:text-red-500 cursor-pointer" size={24} onClick={handlePlayPauseSlideshow} />}
          {isFullscreen ? <RxExitFullScreen className="hover:text-red-500 cursor-pointer" size={20} onClick={handleToggleFullscreen} /> : <RxEnterFullScreen className="hover:text-red-500 cursor-pointer" size={20} onClick={handleToggleFullscreen} />}
          <button className="hover:text-red-500 cursor-pointer tracking-wider text-sm" onClick={() => navigate(`/galleries/${slug}`)}>
            View Gallery
          </button>
        </div>
      )}

      {isMobile && (
        <div className="fixed top-0 left-0 w-full flex justify-between items-center p-4 bg-white bg-opacity-90 border-b border-gray-300 z-50">
          <div className="flex items-center space-x-4">
            <HiOutlineArrowLeft className="hover:text-red-500 cursor-pointer" size={20} onClick={() => navigate("/galleries")} />
            {slideshowPlaying ? <HiOutlinePause className="hover:text-red-500 cursor-pointer" size={24} onClick={handlePlayPauseSlideshow} /> : <AiOutlinePlayCircle className="hover:text-red-500 cursor-pointer" size={24} onClick={handlePlayPauseSlideshow} />}
          </div>
          <button className="hover:text-red-500 cursor-pointer tracking-wider text-sm" onClick={() => navigate(`/galleries/${slug}`)}>
            View Gallery
          </button>
        </div>
      )}
    </div>
  );
};

export default Slideshow;
