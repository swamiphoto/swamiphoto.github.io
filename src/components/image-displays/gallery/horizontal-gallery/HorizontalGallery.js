import React, { useEffect, useState, useRef } from "react";
import { fetchImageUrls } from "../../../../common/images";
import "./HorizontalGallery.css";

const HorizontalGallery = ({ name, imagesFolderUrl, description }) => {
  const [images, setImages] = useState([]);
  const [cursorType, setCursorType] = useState("default");
  const [isCoverScreen, setIsCoverScreen] = useState(true);
  const observer = useRef(null);

  useEffect(() => {
    const fetchImages = async () => {
      const urls = await fetchImageUrls(imagesFolderUrl);
      setImages(urls);
    };

    fetchImages();
  }, [imagesFolderUrl]);

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

  useEffect(() => {
    const imgs = document.querySelectorAll("img.lazy-load");
    imgs.forEach((img) => observer.current.observe(img));
  }, [images]);

  const handleWheel = (event) => {
    const container = document.querySelector(".horizontal-scroll");
    if (event.deltaY !== 0) {
      event.preventDefault();
      container.scrollLeft += event.deltaY;
      if (container.scrollLeft >= window.innerWidth) {
        setIsCoverScreen(false);
      } else {
        setIsCoverScreen(true);
        setCursorType("default"); // Reset cursor to default when returning to cover screen
      }
    }
  };

  const handleStartClick = () => {
    const container = document.querySelector(".horizontal-scroll");
    container.scrollTo({
      left: container.scrollLeft + window.innerWidth,
      behavior: "smooth",
    });
    setIsCoverScreen(false);
  };

  const handleMouseMove = (event) => {
    if (!isCoverScreen) {
      const containerWidth = window.innerWidth;
      const mouseX = event.clientX;

      if (mouseX < containerWidth / 2) {
        setCursorType("left");
      } else {
        setCursorType("right");
      }
    } else {
      setCursorType("default");
    }
  };

  const handleClick = (event) => {
    const container = document.querySelector(".horizontal-scroll");
    const containerWidth = container.clientWidth;
    const clickX = event.clientX;

    if (clickX < containerWidth / 2 && !isCoverScreen) {
      container.scrollTo({
        left: container.scrollLeft - container.clientWidth,
        behavior: "smooth",
      });
      if (container.scrollLeft <= window.innerWidth) {
        setIsCoverScreen(true);
        setCursorType("default"); // Reset cursor to default when returning to cover screen
      }
    } else {
      container.scrollTo({
        left: container.scrollLeft + container.clientWidth,
        behavior: "smooth",
      });
      setIsCoverScreen(false);
    }
  };

  return (
    <div
      className="horizontal-gallery h-screen flex overflow-hidden bg-gray-500"
      onWheel={handleWheel}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      style={{
        cursor: isCoverScreen ? "default" : cursorType === "left" ? 'url("/left-arrow.svg") 24 24, auto' : cursorType === "right" ? 'url("/right-arrow.svg") 24 24, auto' : "default",
      }}>
      <div
        className="flex-grow flex items-center justify-start overflow-y-hidden horizontal-scroll"
        style={{
          scrollbarWidth: "thin" /* Firefox */,
          scrollbarColor: "#4b5563 #6b7280" /* Firefox */,
        }}>
        <div className="relative flex-shrink-0 w-screen h-screen flex flex-col items-center justify-center text-white bg-gray-500">
          <h1 className="text-4xl font-bold mb-2">{name}</h1>
          <p className="text-lg mb-6">{description}</p>
          <button onClick={handleStartClick} className="text-gray-900 bg-white px-10 py-3 hover:bg-gray-400 transition-colors duration-1000 uppercase font-geist-mono tracking-wider">
            View Gallery
          </button>
        </div>
        {images.map((image, index) => (
          <img key={index} data-src={image} className="max-h-[calc(100vh-40px)] object-cover mx-3 lazy-load transition-opacity duration-500 ease-in shadow-lg" onError={(e) => e.target.classList.add("hidden")} />
        ))}
      </div>
    </div>
  );
};

export default HorizontalGallery;