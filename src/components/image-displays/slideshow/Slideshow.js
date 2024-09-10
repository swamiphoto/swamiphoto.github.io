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

const Slideshow = ({
  imageUrls,
  layout = "film-stack",
  title = "Gallery Title",
  youtubeUrl,
  subtitle = "Subtitle",
  customDurations = {},
  captions = {},
  coverImageIndex = 0,
  mobileCoverImageIndex = 0,
  hideCaptionsOnMobile = true,
  slug,
  enableClientView = false, // Add this to check if client view is enabled
  clientSettings = {}, // Contains clientLogin and clientMessage
  clientView = false, // To track whether the user is logged in
  setClientView, // Function to toggle client view
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [aspectRatios, setAspectRatios] = useState([]);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [slideshowPlaying, setSlideshowPlaying] = useState(true); // Start the slideshow immediately
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Manage login modal state
  const [password, setPassword] = useState(""); // Track password input
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
      handlePlayPauseAudio(); // Start playing audio when the slideshow starts
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
      handlePlayPauseAudio(); // Ensure audio resumes when slideshow resumes
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

  // Client login logic
  const handleClientLogin = () => {
    const decryptedPassword = clientSettings.clientLogin; // Assume this is decrypted (currently plain for demo)
    if (password === decryptedPassword) {
      setClientView(true); // Grant access to protected images
      setIsModalOpen(false); // Hide login modal
    } else {
      alert("Incorrect password. Please try again.");
    }
  };

  const handleExitClientView = () => {
    setClientView(false); // Exit protected view
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <main className="flex-grow flex justify-center items-center relative">
        {renderPhotos()}
        {youtubeUrl && <div id="youtube-player" className="absolute top-0 left-0 w-full h-full opacity-0 pointer-events-none"></div>}
      </main>

      {!isMobile && (
        <div className="fixed top-4 left-4 flex space-x-4 bg-white bg-opacity-40 p-3 shadow-md rounded-lg z-50">
          <HiOutlineArrowLeft className="hover:text-red-500 cursor-pointer" size={24} onClick={() => navigate("/galleries")} />
          {slideshowPlaying ? <HiOutlinePause className="hover:text-red-500 cursor-pointer" size={24} onClick={handlePlayPauseSlideshow} /> : <AiOutlinePlayCircle className="hover:text-red-500 cursor-pointer" size={24} onClick={handlePlayPauseSlideshow} />}
          {isFullscreen ? <RxExitFullScreen className="hover:text-red-500 cursor-pointer" size={20} onClick={handleToggleFullscreen} /> : <RxEnterFullScreen className="hover:text-red-500 cursor-pointer" size={20} onClick={handleToggleFullscreen} />}

          {/* Client login and exit view logic */}
          {enableClientView &&
            (clientView ? (
              <button className=" hover:text-red-500 text-sm" onClick={handleExitClientView}>
                Exit Client View
              </button>
            ) : (
              <button className="hover:text-red-500 text-sm" onClick={() => setIsModalOpen(true)}>
                Client Login
              </button>
            ))}

          {/* Exit Slideshow */}
          <button className="hover:text-red-500 cursor-pointer tracking-wider text-sm" onClick={() => navigate(`/galleries/${slug}`)}>
            Exit Slideshow
          </button>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg relative w-3/4 sm:w-1/2 lg:w-1/3">
            <h2 className="text-center text-lg font-bold mb-4">Client Login</h2>
            <input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border border-gray-300 p-2 rounded mb-4" />
            <button onClick={handleClientLogin} className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600">
              Submit
            </button>
          </div>
        </div>
      )}

      {isMobile && (
        <div className="fixed top-0 left-0 w-full flex justify-between items-center p-4 bg-white bg-opacity-90 border-b border-gray-300 z-50">
          <div className="flex items-center space-x-4">
            <HiOutlineArrowLeft className="hover:text-red-500 cursor-pointer" size={20} onClick={() => navigate("/galleries")} />
            {slideshowPlaying ? <HiOutlinePause className="hover:text-red-500 cursor-pointer" size={24} onClick={handlePlayPauseSlideshow} /> : <AiOutlinePlayCircle className="hover:text-red-500 cursor-pointer" size={24} onClick={handlePlayPauseSlideshow} />}
          </div>

          {enableClientView &&
            (clientView ? (
              <button className="hover:text-red-500 cursor-pointer tracking-wider text-sm" onClick={handleExitClientView}>
                Exit Client View
              </button>
            ) : (
              <button className="hover:text-red-500 cursor-pointer tracking-wider text-sm" onClick={() => setIsModalOpen(true)}>
                Client Login
              </button>
            ))}

          {/* Exit Slideshow */}
          <button className="hover:text-red-500 cursor-pointer tracking-wider text-sm" onClick={() => navigate(`/galleries/${slug}`)}>
            Exit Slideshow
          </button>
        </div>
      )}
    </div>
  );
};

export default Slideshow;
