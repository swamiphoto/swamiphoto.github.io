import React, { useEffect, useState } from "react";
import ImageGallery from "../../../components/image-gallery/ImageGallery";
import { fetchImageUrls } from "../../../common/images";

const Naga = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [minDisplayTimeElapsed, setMinDisplayTimeElapsed] = useState(false);

  const customDurations = {
    2: 6000,
  };

  const captions = {
    4: "Do you have your sound on? 🎶",
    6: "View in fullscreen for the best experience!",
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const urls = await fetchImageUrls("portraits/naga-sunflowers");
        setImageUrls(urls);
        const imageLoadPromises = urls.map((url) => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(url);
            img.onerror = () => reject(url);
            img.src = url;
          });
        });
        await Promise.allSettled(imageLoadPromises);
        setImagesLoaded(true);
      } catch (error) {
        console.error("Error loading images:", error);
      }
    };

    fetchImages();

    // Set a timeout to ensure the cover page is displayed for at least 7 seconds
    const timer = setTimeout(() => {
      setMinDisplayTimeElapsed(true);
    }, 5000);

    return () => clearTimeout(timer); // Clean up the timer on unmount
  }, []);

  if (!imagesLoaded || !minDisplayTimeElapsed) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-screen bg-black text-gray-200 text-2xl font-geist-mono">
        <div>Loading your show...please have your sound on!</div>
        <div className="text-sm text-gray-400 mt-2 uppercase">Design and concept by Swami Venkataramani</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-200">
      <ImageGallery
        imageUrls={imageUrls}
        layout="slideshow"
        title="Sunflower Soundarya"
        subtitle="A dreamy evening with the sunflowers in Woodland."
        youtubeUrl="https://www.youtube.com/watch?v=-XTAK0avUEw"
        customDurations={customDurations}
        captions={captions}
        coverImageIndex={4}
        mobileCoverImageIndex={3}
        hideCaptionsOnMobile={true} // Pass the prop to hide captions on mobile
      />
    </div>
  );
};

export default Naga;
