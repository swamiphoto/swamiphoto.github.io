import React, { useEffect, useState } from "react";
import Slideshow from "../../../components/slideshow/Slideshow";
import { fetchImageUrls } from "../../../common/images";
import Loading from "../../../components/slideshow/Loading/Loading";

const NagaBday = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [randomYouTubeLink, setRandomYouTubeLink] = useState("");
  const [customDurations, setCustomDurations] = useState({});
  const [captions, setCaptions] = useState({
    9: "Btw...do you have your sound on? 🎶",
    11: "View in fullscreen for the best experience!",
  });

  const youtubeLinks = ["https://www.youtube.com/watch?v=1GWKhpN1KyA"];

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

    fetchImages();
  }, []);

  return (
    <div>
      {imagesLoaded ? (
        <Slideshow imageUrls={imageUrls} layout="slideshow" title="Happy Birthday, Naga!" subtitle="A dreamy evening with the sunflowers in Woodland." youtubeUrl={randomYouTubeLink} customDurations={customDurations} captions={captions} coverImageIndex={4} mobileCoverImageIndex={3} />
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default NagaBday;
