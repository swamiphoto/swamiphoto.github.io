import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useMediaQuery } from "react-responsive";
import "./FilmStackSlideshowLayout.css";

const FilmStackSlideshowLayout = ({ imageUrls, currentImageIndex, transitioning, aspectRatios, captions, hideCaptionsOnMobile }) => {
  const [tilts, setTilts] = useState([]);
  const [zTilts, setZTilts] = useState([]);
  const [moveXs, setMoveXs] = useState([]);
  const [moveYs, setMoveYs] = useState([]);
  const [durations, setDurations] = useState([]);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  useEffect(() => {
    if (imageUrls.length > 0) {
      const newTilts = imageUrls.map(() => Math.random() * 12 - 6);
      const newZTilts = imageUrls.map(() => Math.random() * 20 - 10);
      const newMoveXs = imageUrls.map(() => `${Math.random() * 15 - 5}px`);
      const newMoveYs = imageUrls.map(() => `${Math.random() * 20 - 5}px`);
      const newDurations = imageUrls.map(() => `${Math.random() * 2 + 3}s`);

      setTilts(newTilts);
      setZTilts(newZTilts);
      setMoveXs(newMoveXs);
      setMoveYs(newMoveYs);
      setDurations(newDurations);
    }
  }, [imageUrls]);

  return (
    <div className="slideshow-container mt-8 md:mt-0">
      {imageUrls.map((url, index) => (
        <div
          key={index}
          className={`film-stack-image ${aspectRatios[index] > 1 ? "horizontal" : "vertical"} ${index === currentImageIndex ? (transitioning ? "slide-out-left" : "visible") : index > currentImageIndex ? "stacked" : "hidden"}`}
          style={{
            "--rotate": `${tilts[index]}deg`,
            "--rotateZ": `${zTilts[index]}deg`,
            "--moveX": moveXs[index],
            "--moveY": moveYs[index],
            "--duration": durations[index],
            zIndex: imageUrls.length - index,
          }}>
          <img src={url} alt={`Image ${index + 1}`} />
          {(!isMobile || !hideCaptionsOnMobile) && captions[index] && (
            <div className="absolute top-10 left-4 w-3/5 p-5">
              <div
                className="text-left bg-yellow-200 font-geist-mono shadow-lg transform rotate-1"
                style={{
                  backgroundImage: "url('images/paper2.jpg')",
                  backgroundSize: "cover",
                  boxShadow: "2px 2px 8px rgba(0,0,0,0.2)",
                  clipPath: "url(#torn-edge-clip)",
                  padding: "20px",
                }}>
                {captions[index]}
              </div>
              <svg width="0" height="0">
                <clipPath id="torn-edge-clip" clipPathUnits="objectBoundingBox">
                  <path d="M0,0 h1 v0.7 l-0.1,0.05 l0.05,0.05 l-0.05,0.05 l0.1,0.05 v0.7 h-1 z" />
                </clipPath>
              </svg>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

FilmStackSlideshowLayout.propTypes = {
  imageUrls: PropTypes.array.isRequired,
  currentImageIndex: PropTypes.number.isRequired,
  transitioning: PropTypes.bool.isRequired,
  aspectRatios: PropTypes.array.isRequired,
  captions: PropTypes.object.isRequired,
  hideCaptionsOnMobile: PropTypes.bool.isRequired,
};

export default FilmStackSlideshowLayout;
