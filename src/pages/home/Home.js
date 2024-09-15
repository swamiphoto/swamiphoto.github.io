import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import IMAGES from "../../common/images";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const desktopImages = [IMAGES.landscapes.mac, IMAGES.landscapes.fog, IMAGES.landscapes.pastel];

  const mobileImages = [IMAGES.landscapes.comet, IMAGES.landscapes.astro, IMAGES.landscapes.falltrees];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState(window.innerWidth < 768 ? mobileImages : desktopImages);

  useEffect(() => {
    // Update images based on screen width
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setImages(mobileImages);
      } else {
        setImages(desktopImages);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [desktopImages, mobileImages]);

  useEffect(() => {
    // Change image every 10 seconds
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, 10000); // 10000ms = 10 seconds

    return () => clearInterval(interval);
  }, [images]);

  const handleButtonClick = () => {
    navigate("/portfolio");
  };

  return (
    <main>
      <div className="relative h-screen overflow-hidden">
        {/* Apply the Ken Burns animation to this parent div */}
        <div className="absolute top-0 left-0 w-full h-full kenburns-animation">
          {images.map((image, index) => (
            <div key={index} className={`absolute top-0 left-0 w-full h-full bg-cover bg-center transition-opacity duration-[5000ms] ease-in-out ${index === currentImageIndex ? "opacity-100" : "opacity-0"}`} style={{ backgroundImage: `url(${image})` }}></div>
          ))}
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 flex flex-col justify-center items-center text-white px-5">
          <div className="text-center pt-10 md:pt-20 mb-10 px-6">
            <h1 className="mx-auto md:max-w-3xl text-4xl md:text-6xl font-bold mb-2">Swami Venkataramani</h1>
            <div className="mx-auto max-w-2xl md:text-2xl mb-8 mt-5 tracking-tight">
              <p>
                Published{" "}
                <Link to="/portfolio" className="underline text-white focus:outline-none">
                  photographer
                </Link>
                ,{" "}
                <a href="https://swamiphoto.substack.com/podcast" target="_blank" rel="noopener noreferrer" className="underline text-white focus:outline-none">
                  podcaster
                </a>
                , and photography coach based in Bay Area. Focusing on{" "}
                <button className="underline text-white focus:outline-none" onClick={() => navigate("/portfolio/landscapes")}>
                  landscapes
                </button>
                ,{" "}
                <button className="underline text-white focus:outline-none" onClick={() => navigate("/portfolio/portraits")}>
                  portraits
                </button>
                , and{" "}
                <button className="underline text-white focus:outline-none" onClick={() => navigate("/portfolio/bollywood")}>
                  Bollywood
                </button>
                .
              </p>
            </div>
            <button onClick={handleButtonClick} className="px-8 py-4 bg-white text-black font-bold opacity-70 hover:opacity-95 uppercase tracking-wider cursor-pointer">
              View My Work
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
