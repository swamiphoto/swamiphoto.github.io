import { useState, useEffect } from "react";
import Head from "next/head"; // Add this import
import Link from "next/link"; // Next.js client-side routing
import { useRouter } from "next/router";
import IMAGES from "../common/images"; // Update your import paths for Next.js
import styles from "./index.module.css"; // Use module CSS instead

const Home = () => {
  const router = useRouter();

  const desktopImages = [IMAGES.landscapes.mac, IMAGES.landscapes.pastel];
  const mobileImages = [IMAGES.landscapes.comet, IMAGES.landscapes.astro, IMAGES.landscapes.falltrees];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState(typeof window !== "undefined" && window.innerWidth < 768 ? mobileImages : desktopImages);

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
    router.push("/portfolio");
  };

  return (
    <>
      <Head>
        {/* Open Graph Meta Tags for Social Sharing */}
        <meta property="og:title" content="Swami Venkataramani" />
        <meta property="og:description" content="Bay Area based photographer specializing in landscapes, portraits, and Bollywood photography" />
        <meta property="og:image" content="/images/mac.png" />
        <meta property="og:url" content="https://swamiphoto.com" />
        <meta property="og:type" content="website" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:title" content="Swami Venkataramani" />
        <meta name="twitter:description" content="Bay Area based photographer specializing in landscapes, portraits, and Bollywood photography" />
        <meta name="twitter:image" content="/images/mac.png" />
        <meta name="twitter:card" content="/images/mac.png" />
      </Head>
      <main>
        <div className="relative h-screen overflow-hidden">
          {/* Apply the Ken Burns animation to this parent div */}
          <div className="absolute top-0 left-0 w-full h-full kenburns-animation">
            {images.map((image, index) => (
              <div key={index} className={`absolute top-0 left-0 w-full h-full bg-cover bg-center transition-opacity duration-[5000ms] ease-in-out ${index === currentImageIndex ? "opacity-100" : "opacity-0"}`} style={{ backgroundImage: `url(${image})` }}></div>
            ))}
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col justify-center items-center text-white px-5">
            <div className="text-center pt-10 md:pt-20 mb-10 px-6">
              <img src="/logo1-white.png" alt="Swami Venkataramani" className="mx-auto h-16 md:h-24 mb-2" />
              <div className="mx-auto max-w-2xl md:text-3xl mb-8 mt-5">
                <p>
                  Published{" "}
                  <Link href="/portfolio" className="underline text-white focus:outline-none">
                    photographer
                  </Link>
                  ,{" "}
                  <a href="https://swamiphoto.substack.com/podcast" target="_blank" rel="noopener noreferrer" className="underline text-white focus:outline-none">
                    podcaster
                  </a>
                  , and photography coach based in Bay Area. Focusing on{" "}
                  <button className="underline text-white focus:outline-none" onClick={() => router.push("/portfolio/landscapes")}>
                    landscapes
                  </button>
                  ,{" "}
                  <button className="underline text-white focus:outline-none" onClick={() => router.push("/portfolio/portraits")}>
                    portraits
                  </button>
                  , and{" "}
                  <button className="underline text-white focus:outline-none" onClick={() => router.push("/portfolio/bollywood")}>
                    Bollywood
                  </button>
                  .
                </p>
              </div>
              <button onClick={handleButtonClick} className="px-8 py-4 bg-white text-black opacity-75 hover:opacity-95 text-xl md:text-2xl tracking-wider cursor-pointer font-serif2">
                View My Work
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
