import React, { useEffect, useState } from "react";
import ImageGallery from "../../../components/image-gallery/ImageGallery";
import { fetchImageUrls } from "../../../common/images";

const Naga = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [randomYouTubeLink, setRandomYouTubeLink] = useState("");

  const customDurations = {};

  const captions = {
    7: "Btw...do you have your sound on? 🎶",
    9: "View in fullscreen for the best experience!",
  };

  const youtubeLinks = [
    "https://www.youtube.com/watch?v=-XTAK0avUEw",
    "https://www.youtube.com/watch?v=ITswHbJPHhQ",
    "https://www.youtube.com/watch?v=jx92a0f_gnA",
    "https://www.youtube.com/watch?v=3yJBhahjQ20",
    "https://www.youtube.com/watch?v=sc7HiznLyoU",
    "https://www.youtube.com/watch?v=sc7HiznLyoU",
    "https://www.youtube.com/watch?v=sc7HiznLyoU",
    "https://www.youtube.com/watch?v=HzjE33U_gy8",
    "https://www.youtube.com/watch?v=tyBQ_EHEpqI",
  ];

  // Function to get a random YouTube link
  const getRandomYouTubeLink = () => {
    const randomIndex = Math.floor(Math.random() * youtubeLinks.length);
    return youtubeLinks[randomIndex];
  };

  useEffect(() => {
    setRandomYouTubeLink(getRandomYouTubeLink());

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
    return (
      <div className="flex flex-col items-center justify-center w-full h-screen bg-black text-gray-200 text-2xl font-geist-mono overflow-hidden m-0 p-0">
        <div>Preparing your show...please turn your sound on!</div>
        <div className="text-sm text-gray-400 mt-2">Designed and conceptualized by Swami Venkataramani</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-200">
      <ImageGallery imageUrls={imageUrls} layout="slideshow" title="Sunflower Soundarya" subtitle="A dreamy evening with the sunflowers in Woodland." youtubeUrl={randomYouTubeLink} customDurations={customDurations} captions={captions} coverImageIndex={4} mobileCoverImageIndex={4} />
    </div>
  );
};

export default Naga;
