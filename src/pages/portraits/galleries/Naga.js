import React, { useEffect, useState } from "react";
import ImageGallery from "../../../components/image-gallery/ImageGallery";
import { fetchImageUrls } from "../../../common/images";

const Naga = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const customDurations = {
    2: 6000,
  };

  const captions = {
    4: "Btw...do you have your sound on? 🎶",
    6: "View in fullscreen for the best experience!",
  };

  useEffect(() => {
    const fetchImages = async () => {
      const urls = await fetchImageUrls("portraits/naga-sunflowers");
      setImageUrls(urls);
      const imageLoadPromises = urls.map((url) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = resolve;
          img.src = url;
        });
      });
      await Promise.all(imageLoadPromises);
      setImagesLoaded(true);
    };

    fetchImages();
  }, []);

  if (!imagesLoaded) {
    return <div className="flex items-center justify-center w-full h-screen bg-black text-gray-300 text-2xl font-geist-mono">Preparing your show...please turn your sound on!</div>;
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
        mobileCoverImageIndex={4}
      />
    </div>
  );
};

export default Naga;
