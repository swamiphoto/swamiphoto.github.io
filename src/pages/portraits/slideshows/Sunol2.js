import React, { useEffect, useState } from "react";
import Slideshow from "../../../components/image-displays/slideshow/Slideshow";
import { fetchImageUrls } from "../../../common/images";
import Loading from "../../../components/image-displays/slideshow/Loading/Loading";

const Sunol2 = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [randomYouTubeLink, setRandomYouTubeLink] = useState("");

  const customDurations = {};

  const captions = {};

  //add youtube links
  const youtubeLinks = ["https://www.youtube.com/watch?v=PYujyluMxMU", "https://www.youtube.com/watch?v=qj4RiKoARPk", "https://www.youtube.com/watch?v=AGmQHSBq2E4", "https://www.youtube.com/watch?v=6P5zx_rxlhI"];

  const getRandomYouTubeLink = () => {
    const randomIndex = Math.floor(Math.random() * youtubeLinks.length);
    return youtubeLinks[randomIndex];
  };

  useEffect(() => {
    setRandomYouTubeLink(getRandomYouTubeLink());

    const fetchImages = async () => {
      const urls = await fetchImageUrls("portraits/sunol2");
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

  return (
    <div>
      {imagesLoaded ? (
        <Slideshow imageUrls={imageUrls} layout="slideshow" title="Sunol Ridge (Set 2)" subtitle="An evening hike with Naga, Bharath, Sathya, and Sriman." youtubeUrl={randomYouTubeLink} customDurations={customDurations} captions={captions} coverImageIndex={19} mobileCoverImageIndex={3} />
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Sunol2;
