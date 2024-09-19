import React, { useEffect, useState, useRef } from "react";
import { HiOutlinePause, HiOutlinePlay, HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi2";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { RxEnterFullScreen, RxExitFullScreen } from "react-icons/rx";
import { useMediaQuery } from "react-responsive";
import { useRouter } from "next/router"; // Next.js routing
import useYouTubePlayer from "./useYouTubePlayer";
import FilmStackSlideshowLayout from "./film-stack-slideshow-layout/FilmStackSlideshowLayout";
import FilmSingleSlideshowLayout from "./film-single-slideshow-layout/FilmSingleSlideshowLayout";
import KenBurnsSlideshowLayout from "./kenburns-slideshow-layout/KenBurnsSlideshowLayout";
import styles from "./Slideshow.module.css";

const Slideshow = ({
  imageUrls,
  layout = "film-stack",
  title = "Gallery Title",
  youtubeUrl,
  subtitle = "Subtitle",
  customDurations = {},
  duration = 10000,
  captions = {},
  coverImageIndex = 0,
  mobileCoverImageIndex = 0,
  hideCaptionsOnMobile = true,
  slug,
  enableClientView = false,
  clientView = false,
  handleExitClientView,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [aspectRatios, setAspectRatios] = useState([]);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [slideshowPlaying, setSlideshowPlaying] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true); // Start with the modal open on mobile

  const playerRef = useYouTubePlayer(youtubeUrl ? youtubeUrl.split("v=")[1] || youtubeUrl.split("/").pop().split("?")[0] : "", setIsPlayerReady);
  const slideshowInterval = useRef(null);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const router = useRouter(); // Using Next.js router

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
    if (imagesLoaded && isPlayerReady && imageUrls.length > 0 && slideshowPlaying) {
      startSlideshow();
      handlePlayPauseAudio();
      return () => clearInterval(slideshowInterval.current);
    }
  }, [imagesLoaded, isPlayerReady, imageUrls, slideshowPlaying]);

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
    const slideDuration = customDurations[currentImageIndex] || duration;
    slideshowInterval.current = setTimeout(() => {
      setTransitioning(true);
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
      setTransitioning(false);
      if (slideshowPlaying) startSlideshow();
    }, slideDuration - 2000);
  };

  useEffect(() => {
    if (isMobile) {
      // Start paused on mobile
      setSlideshowPlaying(false);
    }
  }, [isMobile]);

  const handlePlayPauseAudio = () => {
    if (playerRef.current && isPlayerReady) {
      if (audioPlaying) {
        playerRef.current.pauseVideo();
      } else {
        // Explicitly unmute and play video on user interaction (especially for mobile)
        playerRef.current.unMute();
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
      // On mobile, ensure the video is unmuted and play the audio when starting the slideshow
      if (playerRef.current) {
        playerRef.current.unMute(); // Unmute the video
        playerRef.current.playVideo(); // Explicitly play the video on mobile interaction
      }
      startSlideshow();
      handlePlayPauseAudio();
      setSlideshowPlaying(true);
    }
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

  const handleStartSlideshow = () => {
    setIsModalOpen(false); // Close the modal when the slideshow starts
    handlePlayPauseSlideshow(); // Start the slideshow by toggling the play/pause state
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
      {isMobile && isModalOpen && (
        <div className="fixed inset-0 z-50 bg-white bg-opacity-95 flex justify-center items-center p-4 rounded-lg" style={{ margin: "15px", padding: "15px" }}>
          <div className="text-center">
            <img src={imageUrls[coverImageIndex]} alt="Cover Image" className="mb-4 w-full h-auto rounded-lg" />
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            <p className="text-gray-600 mb-4">{subtitle}</p>
            <button className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition" onClick={handleStartSlideshow}>
              Start Slideshow
            </button>
          </div>
        </div>
      )}

      {isMobile && !isModalOpen && (
        <div className="fixed top-0 left-0 w-full flex justify-between items-center p-4 bg-white bg-opacity-90 border-b border-gray-100 z-50">
          <div className="flex items-center space-x-4">
            <HiOutlineArrowLeft className="hover:text-red-500 cursor-pointer" size={20} onClick={() => router.push("/galleries")} />
            {slideshowPlaying ? <HiOutlinePause className="hover:text-red-500 cursor-pointer" size={24} onClick={handlePlayPauseSlideshow} /> : <HiOutlinePlay className="hover:text-red-500 cursor-pointer" size={24} onClick={handlePlayPauseSlideshow} />}
          </div>

          <div className="ml-auto flex space-x-4 text-sm">
            <button className="hover:text-red-500 cursor-pointer" onClick={() => router.push(`/galleries/${slug}`)}>
              View Gallery
            </button>
          </div>
        </div>
      )}

      <main className="flex-grow flex justify-center items-center relative">
        {renderPhotos()}
        {youtubeUrl && <div id="youtube-player" className="absolute top-0 left-0 w-full h-full opacity-0 pointer-events-none"></div>}
      </main>

      {!isMobile && (
        <div className="fixed top-4 left-4 flex items-center space-x-4 bg-white bg-opacity-80 p-3 shadow-md rounded-lg z-50">
          <HiOutlineArrowLeft className="hover:text-red-500 cursor-pointer" size={24} onClick={() => router.push("/galleries")} />
          {slideshowPlaying ? <HiOutlinePause className="hover:text-red-500 cursor-pointer" size={24} onClick={handlePlayPauseSlideshow} /> : <HiOutlinePlay className="hover:text-red-500 cursor-pointer" size={24} onClick={handlePlayPauseSlideshow} />}
          {isFullscreen ? <RxExitFullScreen className="hover:text-red-500 cursor-pointer" size={20} onClick={handleToggleFullscreen} /> : <RxEnterFullScreen className="hover:text-red-500 cursor-pointer" size={20} onClick={handleToggleFullscreen} />}

          <button className="hover:text-red-500 cursor-pointer" onClick={() => router.push(`/galleries/${slug}`)}>
            View Gallery
          </button>
        </div>
      )}
    </div>
  );
};

export default Slideshow;
