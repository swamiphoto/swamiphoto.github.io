import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { HiOutlineX } from "react-icons/hi";
import { imageMapping, generateUniqueId } from "../../../common/images";

const Lightbox = () => {
  const { imagePath } = useParams(); // Get the imagePath from the URL params
  const navigate = useNavigate();
  const location = useLocation();
  const { previousImageUrls = [], nextImageUrls = [] } = location.state || {};

  const [currentImage, setCurrentImage] = useState(null);
  const [cursorType, setCursorType] = useState("default");
  const [isMiddleSection, setIsMiddleSection] = useState(false);

  // Determine if the image is hardcoded or dynamic based on imageMapping availability
  useEffect(() => {
    const matchingImage = imageMapping[imagePath]; // Check if it's a hardcoded image
    if (matchingImage) {
      // If hardcoded image, use the mapped URL
      setCurrentImage(matchingImage);
    } else {
      // If not found in hardcoded images, assume it's a dynamic image URL
      setCurrentImage(decodeURIComponent(imagePath));
    }
  }, [imagePath]);

  // Handle mouse movement to set the cursor type for navigation
  useEffect(() => {
    const handleMouseMove = (event) => {
      const containerWidth = window.innerWidth;
      const containerHeight = window.innerHeight;
      const mouseX = event.clientX;
      const mouseY = event.clientY;

      // Define the middle 60% section of the screen
      const isInMiddleSection = mouseY > containerHeight * 0.2 && mouseY < containerHeight * 0.8;
      setIsMiddleSection(isInMiddleSection);

      if (isInMiddleSection) {
        if (mouseX < containerWidth / 2 && previousImageUrls.length > 0) {
          setCursorType("left");
        } else if (mouseX >= containerWidth / 2 && nextImageUrls.length > 0) {
          setCursorType("right");
        } else {
          setCursorType("default");
        }
      } else {
        setCursorType("default");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [previousImageUrls, nextImageUrls]);

  // Handle image navigation on click
  const handleClick = () => {
    if (cursorType === "left" && previousImageUrls.length > 0) {
      const previousImage = previousImageUrls[previousImageUrls.length - 1];
      const previousKey = Object.keys(imageMapping).find((key) => imageMapping[key] === previousImage);
      const uniqueId = previousKey ? generateUniqueId(previousKey) : encodeURIComponent(previousImage);

      navigate(`/image/${uniqueId}`, { state: { previousImageUrls: previousImageUrls.slice(0, -1), nextImageUrls: [currentImage, ...nextImageUrls] } });
    }

    if (cursorType === "right" && nextImageUrls.length > 0) {
      const nextImage = nextImageUrls[0];
      const nextKey = Object.keys(imageMapping).find((key) => imageMapping[key] === nextImage);
      const uniqueId = nextKey ? generateUniqueId(nextKey) : encodeURIComponent(nextImage);

      navigate(`/image/${uniqueId}`, { state: { previousImageUrls: [...previousImageUrls, currentImage], nextImageUrls: nextImageUrls.slice(1) } });
    }
  };

  // Close the Lightbox and navigate to the previous page or default to "/"
  const handleClose = (e) => {
    e.stopPropagation(); // Prevent the click event from bubbling up to the parent container
    if (location.state && location.state.from) {
      navigate(location.state.from); // Go back to the referring page
    } else {
      navigate("/"); // Default to home if no referrer
    }
  };

  if (!currentImage) {
    return <div>Image not found</div>;
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
      onClick={handleClick} // Enable clicking on left and right sides for navigation
      style={{
        cursor: cursorType === "left" ? 'url("/left-arrow.svg") 24 24, auto' : cursorType === "right" ? 'url("/right-arrow.svg") 24 24, auto' : "default",
      }}>
      <button
        className="absolute top-4 right-4 text-white text-3xl p-2 opacity-70 hover:opacity-100 transition-opacity duration-200 ease-in-out z-60"
        onClick={handleClose} // Stop event propagation
        style={{ zIndex: 60 }}
        onClick={(e) => {
          e.stopPropagation(); // Prevent click event from bubbling up to parent
          handleClose(e);
        }}>
        <HiOutlineX />
      </button>
      <div className="relative w-full h-full flex items-center justify-center p-5">
        <img src={currentImage + "?width=1300"} alt="Current Image" className="max-h-full max-w-full object-contain" />
      </div>
    </div>
  );
};

export default Lightbox;
