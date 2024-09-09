import React, { useEffect, useState, useRef } from "react";
import MasonryGallery from "./masonry-gallery/MasonryGallery";
import HorizontalGallery from "./horizontal-gallery/HorizontalGallery";
import { fetchImageUrls } from "../../../common/images"; // Import the common function for fetching images
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi2"; // Navigation icons
import { AiOutlinePlayCircle } from "react-icons/ai"; // Play icon
import { RxEnterFullScreen, RxExitFullScreen } from "react-icons/rx"; // Fullscreen icons
import { useNavigate } from "react-router-dom";

const Gallery = ({ layout = "horizontal", name, imagesFolderUrl, description, slug, showCover = true, enableSlideshow = false }) => {
  const [images, setImages] = useState([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const observer = useRef(null);
  const shuffledImagesRef = useRef(null); // Store the shuffled images to maintain consistency across renders
  const navigate = useNavigate(); // Use navigate for programmatic navigation

  // Function to shuffle the array of images
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

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

  useEffect(() => {
    const fetchImages = async () => {
      const urls = await fetchImageUrls(imagesFolderUrl);
      // Shuffle the images only once and store them in a ref
      if (!shuffledImagesRef.current) {
        shuffledImagesRef.current = shuffleArray(urls);
      }
      setImages(shuffledImagesRef.current); // Set the shuffled images
    };

    fetchImages();
  }, [imagesFolderUrl]); // Fetch images when imagesFolderUrl changes

  // Fullscreen toggle
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

  // Navigate to the slideshow page dynamically based on slug
  const handleViewSlideshow = () => {
    if (slug) {
      navigate(`/galleries/${slug}/slideshow`);
    } else {
      console.error("Gallery slug is undefined");
    }
  };
  return (
    <div className="gallery-container relative h-screen">
      {/* Render gallery based on layout */}
      {layout === "masonry" ? <MasonryGallery name={name} images={images} description={description} showCover={showCover} /> : <HorizontalGallery name={name} images={images} description={description} showCover={showCover} />}

      {/* Bottom-left bar with controls */}
      <div className="fixed bottom-10 left-10 flex space-x-4 bg-white bg-opacity-40 p-3 shadow-md rounded-lg z-50">
        <HiOutlineArrowLeft
          className="hover:text-red-500 cursor-pointer"
          size={20}
          onClick={() => navigate("/galleries")} // Navigate back to the galleries page
        />
        {isFullscreen ? <RxExitFullScreen className="hover:text-red-500 cursor-pointer" size={20} onClick={handleToggleFullscreen} /> : <RxEnterFullScreen className="hover:text-red-500 cursor-pointer" size={20} onClick={handleToggleFullscreen} />}
        {/* "View Slideshow" Link */}
        {enableSlideshow && (
          <button onClick={handleViewSlideshow} className="hover:text-red-500 cursor-pointer tracking-wider text-sm">
            View Slideshow
          </button>
        )}
      </div>
    </div>
  );
};

export default Gallery;
