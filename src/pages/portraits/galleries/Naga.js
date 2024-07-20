import React, { useState, useEffect } from "react";
import ImageGallery from "../../../components/image-gallery/ImageGallery";
import { fetchImageUrls } from "../../../common/images"; // Import the utility function

const Naga = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const [customDurations, setCustomDurations] = useState({
    2: 6000,
  });

  const [captions, setCaptions] = useState({
    2: "Hello Naga! Make sure to watch till the end for a special message. 🎉",
    4: "Btw...do you have your sound on? 🎶",
    6: "View in fullscreen for the best experience!",
  });

  useEffect(() => {
    const fetchAndSetImageUrls = async () => {
      const urls = await fetchImageUrls("portraits/naga-sunflowers");
      setImageUrls(urls);

      // Set custom duration and caption for the last image
      setCustomDurations((prevDurations) => ({
        ...prevDurations,
        [urls.length - 1]: 60000, // Set custom duration for the last image
      }));

      setCaptions((prevCaptions) => ({
        ...prevCaptions,
        [urls.length - 1]:
          "Happy Birthday, Naga! I hope you have a fantastic day and a wonderful year ahead. I'm grateful for your friendship and I admire how you chase your dreams, crush your fitness goals, and live life with a playful spirit. Here's to many more adventures together! 🎉🎂🎈 Let's celebrate your 43rd birthday in the Warm Heart of Africa ;) Swami",
      }));
    };

    fetchAndSetImageUrls();
  }, []);

  return (
    <div className="bg-gray-200">
      <ImageGallery imageUrls={imageUrls} layout="slideshow" title="Sunflower Soundarya" subtitle="A dreamy evening with the sunflowers in Woodland." youtubeUrl="https://www.youtube.com/watch?v=-XTAK0avUEw" customDurations={customDurations} captions={captions} />
    </div>
  );
};

export default Naga;
