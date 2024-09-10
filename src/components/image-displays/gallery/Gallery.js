import React, { useEffect, useState, useRef } from "react";
import MasonryGallery from "./masonry-gallery/MasonryGallery";
import HorizontalGallery from "./horizontal-gallery/HorizontalGallery";
import { fetchImageUrls } from "../../../common/images"; // Import the common function for fetching images
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi2"; // Navigation icons
import { AiOutlinePlayCircle } from "react-icons/ai"; // Play icon
import { RxEnterFullScreen, RxExitFullScreen } from "react-icons/rx"; // Fullscreen icons
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive"; // For detecting mobile devices

const Gallery = ({
  layout = "horizontal",
  name,
  imagesFolderUrl,
  description,
  slug,
  showCover = false,
  enableSlideshow = false,
  enableClientView = false, // Add this to check if client view is enabled
  clientSettings = {}, // Contains clientLogin and clientMessage
  clientView = false, // To track whether the user is logged in
  setClientView, // Function to toggle client view
  imageUrls, // Pass image URLs from parent (SingleGallery)
}) => {
  const [images, setImages] = useState([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state for client login
  const [password, setPassword] = useState(""); // Track password input
  const observer = useRef(null);
  const navigate = useNavigate(); // Use navigate for programmatic navigation
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" }); // Detect if user is on mobile

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
    setImages(imageUrls); // Use the image URLs passed from SingleGallery
  }, [imageUrls]);

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

  // Handle client login submission
  const handleClientLogin = () => {
    const decryptedPassword = clientSettings.clientLogin; // Assume this is decrypted (currently plain for demo)
    if (password === decryptedPassword) {
      setClientView(true); // Grant access to protected images
      setIsModalOpen(false); // Hide login modal
    } else {
      alert("Incorrect password. Please try again.");
    }
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
    <div className={`gallery-container relative h-screen`}>
      {/* Fixed header for mobile */}
      {isMobile && (
        <div className="fixed top-0 left-0 w-full flex justify-between items-center p-4 bg-white bg-opacity-90 border-b border-gray-300 z-50">
          <div className="flex items-center space-x-4">
            <HiOutlineArrowLeft
              className="hover:text-red-500 cursor-pointer"
              size={20}
              onClick={() => navigate("/galleries")} // Navigate back to the galleries page
            />
          </div>
          {enableSlideshow && (
            <button onClick={handleViewSlideshow} className="hover:text-red-500 cursor-pointer tracking-wider text-sm">
              View Slideshow
            </button>
          )}
          {enableClientView &&
            (clientView ? (
              <button className="hover:text-red-500 cursor-pointer tracking-wider text-sm" onClick={() => setClientView(false)}>
                Exit Client View
              </button>
            ) : (
              <button className="hover:text-red-500 cursor-pointer tracking-wider text-sm" onClick={() => setIsModalOpen(true)}>
                Client Login
              </button>
            ))}
        </div>
      )}

      {/* Render gallery based on layout */}
      <div>{layout === "masonry" ? <MasonryGallery name={name} images={images} description={description} showCover={showCover} /> : <HorizontalGallery name={name} images={images} description={description} showCover={showCover} />}</div>

      {/* Bottom-left bar for desktop */}
      {!isMobile && (
        <div className="fixed bottom-10 left-10 flex space-x-4 bg-white bg-opacity-40 p-3 shadow-md rounded-lg z-50">
          <HiOutlineArrowLeft
            className="hover:text-red-500 cursor-pointer"
            size={20}
            onClick={() => navigate("/galleries")} // Navigate back to the galleries page
          />
          {isFullscreen ? <RxExitFullScreen className="hover:text-red-500 cursor-pointer" size={20} onClick={handleToggleFullscreen} /> : <RxEnterFullScreen className="hover:text-red-500 cursor-pointer" size={20} onClick={handleToggleFullscreen} />}
          {enableSlideshow && (
            <button onClick={handleViewSlideshow} className="hover:text-red-500 cursor-pointer tracking-wider text-sm">
              View Slideshow
            </button>
          )}
          {enableClientView &&
            (clientView ? (
              <button className="hover:text-red-500 cursor-pointer tracking-wider text-sm" onClick={() => setClientView(false)}>
                Exit Client View
              </button>
            ) : (
              <button className="hover:text-red-500 cursor-pointer tracking-wider text-sm" onClick={() => setIsModalOpen(true)}>
                Client Login
              </button>
            ))}
        </div>
      )}

      {/* Modal for client login */}
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
    </div>
  );
};

export default Gallery;
