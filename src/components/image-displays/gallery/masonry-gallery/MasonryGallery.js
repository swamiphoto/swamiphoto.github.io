import React, { useEffect, useState, useRef } from "react";
import { fetchImageUrls } from "../../../../common/images";
import { HiOutlineArrowDown } from "react-icons/hi";
import Masonry from "react-masonry-css";
import "./MasonryGallery.css";

const MasonryGallery = ({ name, imagesFolderUrl, description, showCover = true }) => {
  const [images, setImages] = useState([]);
  const observer = useRef(null);
  const masonryRef = useRef(null); // Ref for the Masonry container

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

  const handleDownClick = () => {
    if (masonryRef.current) {
      masonryRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const breakpointColumnsObj = {
    default: 2,
    700: 1,
  };

  return (
    <div className="masonry-gallery h-screen overflow-auto bg-gray-500">
      <div className="gallery-content flex-grow p-4 overflow-hidden">
        {showCover && (
          <div className="cover relative flex-shrink-0 w-screen h-screen flex flex-col items-center justify-center text-white bg-gray-500">
            <h1 className="text-4xl font-bold mb-2">{name}</h1>
            <p className="text-lg mb-6">{description}</p>
            <div className="absolute right-10 bottom-10">
              <div className="bg-gray-700 opacity-30 hover:opacity-40 rounded-full p-3">
                <HiOutlineArrowDown className="h-12 w-12 cursor-pointer" onClick={handleDownClick} />
              </div>
            </div>
          </div>
        )}
        <div ref={masonryRef}>
          <Masonry breakpointCols={breakpointColumnsObj} className="flex w-auto -ml-4" columnClassName="pl-4">
            {images.map((image, index) => (
              <div key={index} className="mb-4">
                <img data-src={image} className="w-full h-auto lazy-load transition-opacity duration-500 ease-in shadow-lg" onError={(e) => e.target.classList.add("hidden")} />
              </div>
            ))}
          </Masonry>
        </div>
      </div>
    </div>
  );
};

export default MasonryGallery;
