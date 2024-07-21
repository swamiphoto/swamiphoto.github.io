import React, { useState, useEffect } from "react";
import ImageGallery from "../../../components/image-gallery/ImageGallery";
import { fetchImageUrls } from "../../../common/images"; // Import the utility function

const NagaBday = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const [customDurations, setCustomDurations] = useState({});

  const [captions, setCaptions] = useState({
    4: "Do you have your sound on? 🎶",
    7: "View in fullscreen for a nicer experience!",
  });

  useEffect(() => {
    const fetchAndSetImageUrls = async () => {
      const urls = await fetchImageUrls("portraits/naga-sunflowers");
      setImageUrls(urls);
    };

    fetchAndSetImageUrls();
  }, []);

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
      />
    </div>
  );
};

export default NagaBday;
