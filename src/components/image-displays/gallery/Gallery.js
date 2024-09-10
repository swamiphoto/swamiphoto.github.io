import React, { useEffect, useState, useRef } from "react";
import MasonryGallery from "./masonry-gallery/MasonryGallery";
import HorizontalGallery from "./horizontal-gallery/HorizontalGallery";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi2";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { RxEnterFullScreen, RxExitFullScreen } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const Gallery = ({ layout = "horizontal", name, images, description, slug, showCover = false, enableSlideshow = false, enableClientView = false, clientView = false, setIsModalOpen, handleExitClientView }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const observer = useRef(null);
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  // Intersection observer to lazy-load images
  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.src = entry.target.dataset.src;
          entry.target.onload = () => entry.target.classList.add("loaded");
          entry.target.onerror = () => entry.target.classList.add("hidden");
          observer.current.unobserve(entry.target);
        }
      });
    });

    return () => observer.current.disconnect();
  }, []);

  // Observe images for lazy-loading
  useEffect(() => {
    const imgs = document.querySelectorAll("img.lazy-load");
    imgs.forEach((img) => observer.current.observe(img));
  }, [images]);

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

  const handleViewSlideshow = () => {
    if (slug) {
      navigate(`/galleries/${slug}/slideshow`);
    } else {
      console.error("Gallery slug is undefined");
    }
  };

  return (
    <div className={`gallery-container relative h-screen`}>
      {isMobile && (
        <div className="fixed top-0 left-0 w-full flex justify-between items-center p-4 bg-white bg-opacity-90 border-b border-gray-300 z-50">
          <div className="flex items-center space-x-4">
            <HiOutlineArrowLeft className="hover:text-red-500 cursor-pointer" size={20} onClick={() => navigate("/galleries")} />
          </div>
          {enableSlideshow && (
            <button onClick={handleViewSlideshow} className="hover:text-red-500 cursor-pointer tracking-wider text-sm">
              View Slideshow
            </button>
          )}
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
        </div>
      )}

      <div>{layout === "masonry" ? <MasonryGallery name={name} images={images} description={description} showCover={showCover} /> : <HorizontalGallery name={name} images={images} description={description} showCover={showCover} />}</div>

      {!isMobile && (
        <div className="fixed bottom-10 left-10 flex space-x-4 bg-white bg-opacity-40 p-3 shadow-md rounded-lg z-50">
          <HiOutlineArrowLeft className="hover:text-red-500 cursor-pointer" size={20} onClick={() => navigate("/galleries")} />
          {isFullscreen ? <RxExitFullScreen className="hover:text-red-500 cursor-pointer" size={20} onClick={handleToggleFullscreen} /> : <RxEnterFullScreen className="hover:text-red-500 cursor-pointer" size={20} onClick={handleToggleFullscreen} />}
          {enableSlideshow && (
            <button onClick={handleViewSlideshow} className="hover:text-red-500 cursor-pointer tracking-wider text-sm">
              View Slideshow
            </button>
          )}
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
        </div>
      )}
    </div>
  );
};

export default Gallery;
